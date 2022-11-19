const firebaseConfig = {
  apiKey: "AIzaSyBrKguUcNXNXynd7FQNi-IyWE3VHoY-81w",
  authDomain: "todo-list-new-b7339.firebaseapp.com",
  projectId: "todo-list-new-b7339",
  storageBucket: "todo-list-new-b7339.appspot.com",
  messagingSenderId: "605036203573",
  appId: "1:605036203573:web:aa5767ef1e233bb4d6ab7c",
  measurementId: "G-V5PTB31S22",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
