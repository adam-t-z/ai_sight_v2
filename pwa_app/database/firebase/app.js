// Mock Firebase SDK for development
// This file simulates Firebase imports without actual Firebase connection

// Mock Firebase App
export const initializeApp = (config) => {
  console.log('🔥 Mock Firebase: App initialized with config:', config);
  return { name: 'mock-app', options: config };
};

// Mock Firebase Auth
export const getAuth = (app) => {
  console.log('🔥 Mock Firebase: Auth service initialized');
  return { app, currentUser: null };
};

export const createUserWithEmailAndPassword = async (auth, email, password) => {
  console.log('🔥 Mock Firebase: Creating user with email:', email);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          uid: 'mock-uid-' + Date.now(),
          email: email,
          displayName: email.split('@')[0]
        }
      });
    }, 1000);
  });
};

export const signInWithEmailAndPassword = async (auth, email, password) => {
  console.log('🔥 Mock Firebase: Signing in user:', email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'sarah@example.com' && password === 'password123') {
        resolve({
          user: {
            uid: 'mock-uid-sarah',
            email: email,
            displayName: 'Sarah'
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const signOut = async (auth) => {
  console.log('🔥 Mock Firebase: User signed out');
  return Promise.resolve();
};

export const onAuthStateChanged = (auth, callback) => {
  console.log('🔥 Mock Firebase: Auth state listener attached');
  // Mock persistent auth state
  const savedUser = localStorage.getItem('mockUser');
  if (savedUser) {
    setTimeout(() => callback(JSON.parse(savedUser)), 100);
  } else {
    setTimeout(() => callback(null), 100);
  }
  
  // Return unsubscribe function
  return () => console.log('🔥 Mock Firebase: Auth listener unsubscribed');
};

// Mock Firestore
export const getFirestore = (app) => {
  console.log('🔥 Mock Firebase: Firestore service initialized');
  return { app, type: 'firestore' };
};

export const collection = (firestore, path) => {
  console.log('🔥 Mock Firebase: Collection reference created for:', path);
  return { path, type: 'collection' };
};

export const doc = (firestore, path) => {
  console.log('🔥 Mock Firebase: Document reference created for:', path);
  return { path, type: 'document' };
};

export const addDoc = async (collectionRef, data) => {
  console.log('🔥 Mock Firebase: Document added to collection:', collectionRef.path, data);
  return Promise.resolve({ id: 'mock-doc-' + Date.now() });
};

export const getDocs = async (collectionRef) => {
  console.log('🔥 Mock Firebase: Getting documents from:', collectionRef.path);
  return Promise.resolve({
    docs: [],
    size: 0,
    empty: true
  });
};