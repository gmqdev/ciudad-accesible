/* @flow */

import { KeepAwake, Util } from 'expo';
import * as React from 'react';
import { StatusBar, I18nManager, AsyncStorage, Platform } from 'react-native';
import { Provider as PaperProvider, DarkTheme, DefaultTheme, Theme } from 'react-native-paper';
import createReactContext from 'create-react-context';
import { createDrawerNavigator } from 'react-navigation';
import Principal from './src/Principal';
import RootNavigator from './src/RootNavigator';
import DrawerItems from './DrawerItems';

const mywhiteTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f2f2f2',
    accent: '#e91e63',
  },
};

const mydarkTheme = {
  ...DarkTheme,
  roundness: 4,
  colors: {
    ...DarkTheme.colors,
    primary: '#242424',
    accent: '#03a9f4',
    surface: '#0d0d0d',
  },
};

type State = {
  theme: mywhiteTheme,
  rtl: boolean,
};

const PreferencesContext: any = createReactContext();

const App = createDrawerNavigator(
  { Home: { screen: RootNavigator } },
  {
    contentComponent: () => (
      <PreferencesContext.Consumer>
        {preferences => (
          <DrawerItems
            toggleTheme={preferences.theme}
            toggleRTL={preferences.rtl}
            isRTL={preferences.isRTL}
            isDarkTheme={preferences.isDarkTheme}
          />
        )}
      </PreferencesContext.Consumer>
    ),
    // set drawerPosition to support rtl toggle on android
    drawerPosition:
      Platform.OS === 'android' && (I18nManager.isRTL ? 'right' : 'left'),
  }
);

export default class PaperExample extends React.Component<{}, State> {
  state = {
    theme: mywhiteTheme,
    rtl: I18nManager.isRTL,
    logged: false
  };

  async componentDidMount() {
    StatusBar.setBarStyle('light-content');

    try {
      const prefString = await AsyncStorage.getItem('preferences');
      const preferences = JSON.parse(prefString);

      if (preferences) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState(state => ({
          theme: preferences.theme === 'dark' ? mydarkTheme : mywhiteTheme,
          rtl:
            typeof preferences.rtl === 'boolean' ? preferences.rtl : state.rtl,
        }));
      }
    } catch (e) {
      // ignore error
    }
  }

  _savePreferences = async () => {
    try {
      AsyncStorage.setItem(
        'preferences',
        JSON.stringify({
          theme: this.state.theme === mydarkTheme ? 'dark' : 'light',
          rtl: this.state.rtl,
        })
      );
    } catch (e) {
      // ignore error
    }
  };

  _toggleTheme = () =>
    this.setState(
      state => ({
        theme: state.theme === mydarkTheme ? mywhiteTheme : mydarkTheme,
      }),
      this._savePreferences
    );

  _toggleRTL = () =>
    this.setState(
      state => ({
        rtl: !state.rtl,
      }),
      async () => {
        await this._savePreferences();

        I18nManager.forceRTL(this.state.rtl);
        Util.reload();
      }
    );

  render() {
    //const { logged } = this.state;
    //if(logged) {
      return (
        <PaperProvider theme={this.state.theme}>
          <PreferencesContext.Provider
            value={{
              theme: this._toggleTheme,
              rtl: this._toggleRTL,
              isRTL: this.state.rtl,
              isDarkTheme: this.state.theme === mydarkTheme,
            }}
          >
            <App
              persistenceKey={
                process.env.NODE_ENV !== 'production'
                  ? 'NavigationStateDEV'
                  : null
              }
            />
          </PreferencesContext.Provider>
          <KeepAwake />
        </PaperProvider>
      );
    //} else {
    //  <Login value={{
    //    isLogged={this.state.logged}/>
    //  }}
    //}
    
  }
}