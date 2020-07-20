import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAgaK292pA4FMKc2x3SkOifMSK9Z8Rhg-o",
  authDomain: "jump-serverless-react.firebaseapp.com",
  databaseURL: "https://jump-serverless-react.firebaseio.com",
  projectId: "jump-serverless-react",
  storageBucket: "jump-serverless-react.appspot.com",
  messagingSenderId: "952841608353",
  appId: "1:952841608353:web:41c15edcce6a2bb7e264e0",
  measurementId: "G-0K5XTM1FKN",
};
const app = firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// export { firestore };
export default app;