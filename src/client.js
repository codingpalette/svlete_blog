import * as sapper from '@sapper/app';
import { firebase } from '@firebase/app';
import firebaseConfig from './firebaseConfig';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';
import '@firebase/storage';
import '@firebase/analytics';

sapper.start({
  target: document.querySelector('#sapper')
});

firebase.initializeApp(firebaseConfig);
firebase.analytics();
