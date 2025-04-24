import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export async function getFCMToken() {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    console.log("FCM 토큰 발급 성공:", token);

    return token;
  } catch (error) {
    console.error("FCM 토큰 발급 실패:", error);
  }
}
export async function deleteFCMToken() {
  try {
    const result = await deleteToken(messaging);

    return result;
  } catch (error) {
    console.error("FCM token 삭제 실패:", error);
  }
}
