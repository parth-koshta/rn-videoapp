import auth from '@react-native-firebase/auth';

export const registerWithFirebase = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e.message);
  }
};

export const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e.message);
  }
};
