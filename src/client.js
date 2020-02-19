import * as sapper from '@sapper/app';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';

sapper.start({
  target: document.querySelector('#sapper')
});

let firebaseConfig = {
  apiKey: 'AIzaSyA7-pMLxi8lpNQ21ny1e4-DAFxaJYqmMeY',
  authDomain: 'my-blog-7d61e.firebaseapp.com',
  databaseURL: 'https://my-blog-7d61e.firebaseio.com',
  projectId: 'my-blog-7d61e',
  storageBucket: 'my-blog-7d61e.appspot.com',
  messagingSenderId: '848807520356',
  appId: '1:848807520356:web:58361cf8c464c5452f1771',
  measurementId: 'G-M13M8NZS5Z'
};
firebase.initializeApp(firebaseConfig);
