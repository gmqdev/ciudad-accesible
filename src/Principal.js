/* @flow */

import * as React from 'react';
import { ScrollView, View, Input, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { BottomNavigation, TextInput } from 'react-native-paper';
import NuevaDenuncia from './NuevaDenuncia';
import LoginNew from './LoginNew';

type State = {
  index: number,
  routes: Array<{
    key: string,
    title: string,
    icon: string,
    color: string,
  }>,
};

type StateInput = {
  text: string,
  name: string,
  outlinedText: string,
};

const PhotoGallery = ({ route }) => {
  const PHOTOS = Array.from({ length: 24 }).map(
    (_, i) => `https://loremflickr.com/g/300/300/paso%20de%20peatones`
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {PHOTOS.map(uri => (
        <View key={uri} style={styles.item}>
          <Image source={{ uri }} style={styles.photo} />
        </View>
      ))}
    </ScrollView>
  );
};


export default class Principal extends React.Component<{},State> {
  static title = 'Bottom Navigation';

  state = {
    index: 1,
    routes: [
      {
        key: 'denuncias',
        title: 'Denuncias',
        icon: 'home',
        color: '#ffff66',
      },
      {
        key: 'nuevadenuncia',
        title: 'Nueva Denuncia',
        icon: 'add-to-photos',
        color: '#00796b',
      },
      {
        key: 'login',
        title: 'Login',
        icon: 'person',
        color: '#f2f2f2',
      },
    ],
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          denuncias: PhotoGallery,
          nuevadenuncia: NuevaDenuncia,
          login: LoginNew,
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  item: {
    height: Dimensions.get('window').width/2,
    width: '100%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});

