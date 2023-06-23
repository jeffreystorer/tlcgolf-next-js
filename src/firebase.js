import { initializeApp } from 'firebase/app';

let firebaseConfig = {
  apiKey: 'AIzaSyCWOTHZxzxvJS7990cNcvF8pSWEoEf_cbg',
  authDomain: 'tlc-golf-ca7ad.firebaseapp.com',
  databaseURL: 'https://tlc-golf-ca7ad.firebaseio.com',
  projectId: 'tlc-golf-ca7ad',
  storageBucket: 'tlc-golf-ca7ad.appspot.com',
  messagingSenderId: '289278089623',
  appId: '1:289278089623:web:c391bc4b73ca52b9ed4cd2',
  measurementId: 'G-V7BY7Z072K',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

//TODO: update Firebase to lastest (see TVL unfinished refactor)
