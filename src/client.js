import * as sapper from '@sapper/app';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';

sapper.start({
  target: document.querySelector('#sapper')
});

let firebaseConfig = {};
firebase.initializeApp(firebaseConfig);
