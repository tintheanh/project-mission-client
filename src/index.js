import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: 'AIzaSyAq9FSKG22cFXNVLMBRbuWJQwKJClVEr3A',
  authDomain: 'asc-project-c3066.firebaseapp.com',
  databaseURL: 'https://asc-project-c3066.firebaseio.com',
  projectId: 'asc-project-c3066',
  storageBucket: 'asc-project-c3066.appspot.com',
  messagingSenderId: '693514416458'
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
