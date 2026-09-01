import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDk0XpNoN7wBVdWYZB9ipXzZqkfIXCOrIA",
  authDomain: "my-website-16906.firebaseapp.com",
  projectId: "my-website-16906",
  storageBucket: "my-website-16906.firebasestorage.app",
  messagingSenderId: "817178826973",
  appId: "1:817178826973:web:6ecaf4ffaba1d25b2de334",
  measurementId: "G-30NNCF4WCP"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize analytics safely if in browser and supported
export let analytics: unknown = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Ignore analytics init failure in non-supported environments
  });
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  timestamp: string;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    timestamp: new Date().toISOString()
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
}

// Test initial connection
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'settings', 'site'));
    console.log("Firebase Firestore connected successfully.");
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client in offline/cache mode.");
    }
    return false;
  }
}
