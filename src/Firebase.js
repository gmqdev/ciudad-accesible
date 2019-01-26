import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDhL4r9UwjT6WVA42onVEinaAfr5ER0dvM',
  authDomain: 'ciudad-accesible-uhu.firebaseapp.com',
  databaseURL: 'https://ciudad-accesible-uhu.firebaseio.com',
  projectId: 'ciudad-accesible-uhu',
  storageBucket: 'ciudad-accesible-uhu.appspot.com',
  messagingSenderId: '847939309612',
};
export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());