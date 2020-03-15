import auth from '@react-native-firebase/auth';

export const registerWithFirebase = async (email, password, displayName) => {
  try {
    let user = await auth().createUserWithEmailAndPassword(email, password);
    console.log(user);
    if(user.additionalUserInfo.isNewUser){
      let newUser = auth().currentUser;
      newUser.updateProfile({
        displayName: displayName
      })
    }
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
