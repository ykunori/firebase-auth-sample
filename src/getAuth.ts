import {initializeApp} from "firebase/app";
import {
  getAuth as firebaseGetAuth,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword, setPersistence, browserSessionPersistence, createUserWithEmailAndPassword
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyDtNw58qErGSU8wEeDZd3vRnDQGaZ0wShw",
  authDomain: "test-firebase-auth-4329e.firebaseapp.com",
  projectId: "test-firebase-auth-4329e",
  storageBucket: "test-firebase-auth-4329e.appspot.com",
  messagingSenderId: "729108113062",
  appId: "1:729108113062:web:f6384a42d6765f3df7f667"

}

initializeApp(config);

export const getAuth = () => {
  return firebaseGetAuth();
}

export const checkLogin = () => {
  return new Promise((resolve, reject) => {

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
      resolve(uid)
      // ...
    } else {
      reject(null)
      // User is signed out
      // ...
    }

  }
  )
  })
  }
export const signIn = async (email, password) => {
  const auth = getAuth()
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)
      // ...
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });

  if (userCredential) {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

}

export const signUp = async (email, password) => {
  const auth = getAuth()

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user)
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage)
    });

  if (userCredential) {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

}

export const signOut = () => {
  const auth = getAuth();
  return firebaseSignOut(auth).then(() => {
    console.log('success sign out ')
    return 'success'
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    return 'error'
    // An error happened.
  });
}