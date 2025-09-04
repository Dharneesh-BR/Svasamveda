// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTrU2IATfepLZ7tjn5HVSWW6PKKPpcRgg",
  authDomain: "svasam-a94e1.firebaseapp.com",
  projectId: "svasam-a94e1",
  storageBucket: "svasam-a94e1.firebasestorage.app",
  messagingSenderId: "857788126873",
  appId: "1:857788126873:web:dea096fcd1f7b9f1978a08",
  measurementId: "G-QW8YP54GS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Sign up function
export const signUp = async (name, email, password, mobile) => {
  try {
    console.log('Starting signup process for:', email);
    
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created in Auth:', user.uid);
    
    try {
      // 2. Update user profile with display name
      await updateProfile(user, {
        displayName: name
      });
      console.log('User profile updated with display name');

      // 3. Save additional user data to Firestore
      const userDoc = {
        uid: user.uid,
        name,
        email,
        mobile,
        createdAt: new Date().toISOString(),
        role: 'user',
        emailVerified: user.emailVerified
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      console.log('User data saved to Firestore');
      
      return { 
        success: true, 
        user: { 
          uid: user.uid,
          email: user.email,
          displayName: name,
          ...userDoc
        } 
      };
    } catch (dbError) {
      console.error('Error in user setup:', dbError);
      // If we fail after creating the auth user, delete the auth user to prevent orphaned accounts
      try {
        await user.delete();
        console.log('Cleaned up auth user due to failure');
      } catch (deleteError) {
        console.error('Error cleaning up auth user:', deleteError);
      }
      throw dbError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error('Signup error:', {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return { 
      success: false, 
      error: error.code || 'auth/unknown-error',
      message: error.message 
    };
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out function
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Password reset function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { auth, db };