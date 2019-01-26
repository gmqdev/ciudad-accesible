/* @flow */

import * as React from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  type Theme,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { Button, IconButton, Text, TextInput, HelperText, withTheme } from 'react-native-paper';
import { ImagePicker, Permissions, Location } from 'expo';

type Props = {
  theme: Theme,
};

type State = {
  tipo: string,
  lugar: string,
  image: null,
  region: {
    latitude: 36,
    longitude: 136.500000,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

class NuevaDenuncia extends React.Component<Props, State> {
  static title = 'TextInput';

  state = {
    tipo: '',
    lugar: '',
    image: null,
    region: {
      latitude: 36,
      longitude: 136.500000,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ image: uri });
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    this.setState({ image: uri });
  };

  reset = () => {
    this.setState({
      image: null
    });
  }

  linkarmap = () => {
    {/* Linkar con app de mapas */}
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.region.latitude},${this.state.region.longitude}`;
    const label = 'Ubicación denuncia';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    }); 
    Linking.openURL(url)
  }

  resetHandler = () =>{
    this.reset();
  }

  _getLocationAsync = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: background }]}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          {/* Titulo */}
          <Text
            style={styles.titleText}>
          NUEVA DENUNCIA
          </Text>

          {/* Inputs */}
          <TextInput
            style={stylefirst.inputContainerStyle}
            autoCorrect={false}
            label="Tipo de Denuncia"
            placeholder="Falta rampa, acerado irregular, ancho insuficiente, ..."
            value={this.state.tipo}
            onChangeText={tipo => this.setState({ tipo })}
          />
          
          {/* Camera */}
          <View style={styles.container}>
            <View style={styles.placeholder}>
              <Image source={{ uri: this.state.image }} style={styles.previewImage} />
            </View>

            <Text style={styles.inputContainerStyle}>
            Latitud: {this.state.region.latitude} </Text>
            <Text style={styles.inputContainerStyle}>
            Longitud: {this.state.region.longitude} </Text>

            <View style={styles.button}>

              <Button 
              style={styles.inputContainerStyle}
              icon="add-to-photos"
              mode="contained"
              title="Añadir Foto" 
              onPress={this.selectPicture}>
              </Button>

              <Button 
              style={styles.inputContainerStyle}
              icon="add-a-photo"
              mode="contained"
              title="Hacer Foto"
              onPress={this.takePicture}>
              </Button>

              <Button 
              style={styles.inputContainerStyle}
              icon="delete"
              mode="contained"
              title="Borrar Foto"
              onPress={this.resetHandler}>
              </Button>

              <Button 
                style={styles.inputContainerStyle}
                icon="location-searching"
                mode="contained"
                title="Ver ubicación" 
                onPress={
                this.linkarmap}>
              </Button>

            </View>
          </View>

          {/* Buttons */}
          <Button
            style={stylefirst.inputContainerStyle}
            icon="add-location"
            mode="contained"
            title="Añadir Ubicación"
            onPress={this._getLocationAsync}>
            Añadir Ubicación
          </Button>

          <Button
            style={styles.inputContainerStyle}
            mode="contained"
            title="Denunciar"
            color="#03a9f4"
            accessibilityLabel="Botón de denunciar"
            onPress={() =>
              alert('Denuncia realizada')
            }>
            Denunciar
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
  },
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 280,
  },
  button: {
    width: "100%",
    marginTop: 8,
    marginHorizontal: 8,
    flexDirection:"row",
    justifyContent: 'center',
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
});


const stylefirst = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 16,
    margin: 8,
  },
});

export default withTheme(NuevaDenuncia);
