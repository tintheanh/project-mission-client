import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: 'AIzaSyCMmhOot8et7cJv9xVF6XG4fzF0y9BqpRM',
  authDomain: 'mission-asc.firebaseapp.com',
  databaseURL: 'https://mission-asc.firebaseio.com',
  projectId: 'mission-asc',
  storageBucket: 'mission-asc.appspot.com',
  messagingSenderId: '1005590867382'
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
