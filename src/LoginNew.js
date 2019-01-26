/* @flow */

import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  type Theme,
} from 'react-native';
import { Button, Text, TextInput, HelperText, withTheme } from 'react-native-paper';
import { Constants } from 'expo';
import firebase from './Firebase';

type Props = {
  theme: Theme,
};

type State = {
  email: string,
  pass: string,
};

class LoginNew extends React.Component<Props, State> {
  static title = 'TextInput';

  signup(email, pass) {
    try {
      if (this.state.pass.length < 6) {
        alert('Please enter atleast 6 characters');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, pass);

      alert('Account created');
      return;
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      alert(error.toString());
    }
  }
  login(email, pass) {
    try {
      if (!this.state.email.includes("@") || this.state.pass.length == 0) {
        alert('Please enter Email and Pass');
        return;
      }
      firebase.auth().signInWithEmailAndPassword(email, pass);

      alert('Logged In!');
      return;

      // Navigate to the Home page
    } catch (error) {
      console.log(error.toString());
    }
  }
  logout() {
    try {
      firebase.auth().signOut();

      alert('Logged Out!');
      return;
      // Navigate to login view
    } catch (error) {
      console.log(error);
    }
  }

  state = {
    tipo: '',
    lugar: '',
  };

  _isUsernameValid = () => /^[a-zA-Z]*$/.test(this.state.name);

  _isEmailValid = () => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(this.state.email);

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
          {/* Inputs */}
          <TextInput
            style={stylefirst.inputContainerStyle}
            autoCorrect={false}
            label="Email"
            placeholder="usuario@correo.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.inputContainerStyle}
            secureTextEntry={true}
            autoCorrect={false}
            label="Contraseña"
            placeholder="Debe de contener al menos 6 caracteres"
            value={this.state.pass}
            onChangeText={pass => this.setState({ pass })}
          />
          
          {/* 
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Email_"
              placeholder="usuario@correo.com"
              value={this.state.email}
              error={!this._isEmailValid()}
              onChangeText={email => this.setState({ email })}
            />
            <HelperText type="error" visible={!this._isEmailValid()}>
              Error: Debe ser una dirección de email
            </HelperText>
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Contraseña"
              placeholder="Enter username, only letters"
              value={this.state.name}
              error={!this._isUsernameValid()}
              onChangeText={name => this.setState({ name })}
            />
            <HelperText type="error" visible={!this._isUsernameValid()}>
              Error: Solo permite letras
            </HelperText>
          </View>
          */}
          
          {/* Buttons */}
          <Button
            style={stylefirst.inputContainerStyle}
            mode="contained"
            title="Entrar"
            color="#03a9f4"
            accessibilityLabel="Botón de entrar"
            onPress={() =>
              this.login(this.state.email, this.state.pass)
            }>
            Entrar
          </Button>

          <Button
            style={styles.inputContainerStyle}
            mode="contained"
            title="Registrarse"
            color="#3f51b5"
            accessibilityLabel="Botón de registrarse"
            onPress={() =>
              this.signup(this.state.email, this.state.pass)
            }>
            Registrarse
          </Button>

          <Button
            style={styles.inputContainerStyle}
            mode="contained"
            title="Salir"
            color="#f44336"
            accessibilityLabel="Botón de salir"
            onPress={() =>
              this.logout()
            }>
            Salir
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
});

const stylefirst = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 16,
    margin: 8,
  },
});

export default withTheme(LoginNew);
