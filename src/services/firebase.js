import { auth, firestore, storage } from '../firebase';

const createUser = async (data) => {
  try {
    const {
      firstName,
      lastName,
      role,
      email,
      dob,
      organizationName,
      password,
      image,
    } = data;
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const { uid } = res.user;
    const imagePath = await uploadFile(image, uid);
    await firestore.collection('users').doc(uid).set({
      firstName,
      lastName,
      email,
      dob,
      organizationName,
      uid,
      role,
      imagePath,
    });
    return res.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async (uid) => {
  const userRef = firestore.collection('users').doc(uid);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new Error('No user found with this ID.');
  }
  return doc.data();
};

const uploadFile = async (file, fileName) => {
  try {
    await storage.ref().child(`users/${fileName}`).put(file);
    return `users/${fileName}`;
  } catch (error) {
    throw new Error('Image Upload Fail');
  }
};

export default createUser;
export { getUser };
