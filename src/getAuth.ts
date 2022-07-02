import {initializeApp} from "firebase/app";
import {
  getAuth as firebaseGetAuth,
  signOut as firebaseSignOut,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification, sendPasswordResetEmail
} from "firebase/auth";

const config = {
}

initializeApp(config);
const auth = firebaseGetAuth()

export const getAuth = () => {
  return auth
}

export const checkLogin = () => {
  return new Promise((resolve, reject) => {

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const emailVerified = user.emailVerified;
        console.log('uid = ', uid, 'emailVerified',emailVerified)
        resolve(uid && emailVerified)
        // ...
      // } else {
      //   console.log(146)
      //   reject('error')
      //   // User is signed out
      //   // ...
      }
    })
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

export const signUp =  (email, password) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      if (!auth) {
        return
      }
      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log('send verification mail')
            // Email verification sent!
            // ...
          });
      }

      if (userCredential) {
        console.log(1245)
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            console.log(1251)
            return signInWithEmailAndPassword(auth, email, password);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage)
    });
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


export const updateEmail = (email) => {
  const auth = getAuth()
  if (!auth.currentUser) {
    // fire fail
    console.log('not login')
    return
  }

  firebaseUpdateEmail(auth.currentUser, email).then(() => {
    console.log('success update email')
    // Email updated!
    // ...
  }).catch((error) => {
    console.log('fail update email')
    // An error occurred
    // ...
  });

}


export const updatePassword = (newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    console.log('not login')
    return
  }

  firebaseUpdatePassword(user, newPassword).then(() => {
    // Update successful.
    console.log('success update password')
  }).catch((error) => {
    console.log('fail update password')
    // An error ocurred
    // ...
  });
};

export const resetPassword = (email) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('success send reset')
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}