import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyCMmhOot8et7cJv9xVF6XG4fzF0y9BqpRM',
  authDomain: 'mission-asc.firebaseapp.com',
  databaseURL: 'https://mission-asc.firebaseio.com',
  projectId: 'mission-asc',
  storageBucket: 'mission-asc.appspot.com',
  messagingSenderId: '1005590867382'
};
firebase.initializeApp(config);

// const config = {
//   apiKey: 'AIzaSyAq9FSKG22cFXNVLMBRbuWJQwKJClVEr3A',
//   authDomain: 'asc-project-c3066.firebaseapp.com',
//   databaseURL: 'https://asc-project-c3066.firebaseio.com',
//   projectId: 'asc-project-c3066',
//   storageBucket: 'asc-project-c3066.appspot.com',
//   messagingSenderId: '693514416458'
// };
// firebase.initializeApp(config);

// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);
// export const db = firebase.firestore();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
