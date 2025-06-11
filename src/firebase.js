import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBogyextpChCueUnFoJOTNVIVMFqZz6-k",
  authDomain: "learnspace-301e8.firebaseapp.com",
  projectId: "learnspace-301e8",
  storageBucket: "learnspace-301e8.firebasestorage.app",
  messagingSenderId: "266201480329",
  appId: "1:266201480329:web:945b584b77341d74ab1a58",
  measurementId: "G-ZSHVVXC8SV",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };
