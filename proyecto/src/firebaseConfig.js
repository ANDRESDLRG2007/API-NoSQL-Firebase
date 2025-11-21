import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
apiKey: "AIzaSyA2Rae-sZYIIyDIYbodXcwlLN7PJClx3Pw",
authDomain: "actividad-firebase-5aa4b.firebaseapp.com",
projectId: "actividad-firebase-5aa4b",
storageBucket: "actividad-firebase-5aa4b.firebasestorage.app",
messagingSenderId: "16340954814",
appId: "1:16340954814:web:b04941bed961d4a5d338ef"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app); // ✅ ¡Esto es necesario!
export { auth, db };