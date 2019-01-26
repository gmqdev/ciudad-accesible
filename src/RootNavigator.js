/* @flow */

import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import Principal from './Principal';

export default createStackNavigator(
  {
    home: { screen: Principal },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: (
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Ciudad Accesible" />
        </Appbar.Header>
      ),
    }),
  }
);
