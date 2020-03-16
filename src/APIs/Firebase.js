import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const registerWithFirebase = async (email, password, displayName) => {
  try {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        database().ref('users/' + res.user.uid).set({
          userName: displayName,
          email: email
      })
      });
  } catch (e) {
    alert(e);
  }
};

export const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    alert(e);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    alert(e);
  }
};
