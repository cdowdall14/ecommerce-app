import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAEvOnJh-tqhDp_Je_kf9JTfsLvZ8FnQSk',
  authDomain: 'ecommerce-1c5f2.firebaseapp.com',
  databaseURL: 'https://ecommerce-1c5f2.firebaseio.com',
  projectId: 'ecommerce-1c5f2',
  storageBucket: 'ecommerce-1c5f2.appspot.com',
  messagingSenderId: '427953299999',
  appId: '1:427953299999:web:860af50d7145212e282b2a',
  measurementId: 'G-PT49MNRR92',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
