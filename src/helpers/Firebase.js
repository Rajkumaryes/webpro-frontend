// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

import { firebaseConfig } from '../constants/defaultValues';

firebase.initializeApp(firebaseConfig);

const auth = true;
const database = true;

export { auth, database };
