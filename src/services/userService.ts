import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { UserDetails } from '../types';

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const saveUserData = async (userData: UserDetails) => {
  try {
    let profilePictureBase64 = '';
    
    // Convert profile picture to base64 if exists
    if (userData.profilePicture) {
      profilePictureBase64 = await convertImageToBase64(userData.profilePicture);
    }

    // Prepare data for Firestore
    const userDataToSave = {
      name: userData.name,
      mobile: userData.mobile,
      age: userData.age,
      languages: userData.languages,
      currentAddress: userData.currentAddress,
      isSameAddress: userData.isSameAddress,
      address: userData.isSameAddress ? null : userData.address,
      works: userData.works,
      profilePicture: profilePictureBase64,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save to Firestore
    const usersCollection = collection(db, 'users');
    const docRef = await addDoc(usersCollection, userDataToSave);
    return docRef.id;
  } catch (error) {
    console.error('Error in saveUserData:', error);
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('Unable to save data. Please try again later.');
    }
    throw error;
  }
};