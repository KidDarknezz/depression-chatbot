import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA2nc447OseJOA-LGKUblHUUmDMakwh79w",
  authDomain: "project-depression-chatbot.firebaseapp.com",
  projectId: "project-depression-chatbot",
  storageBucket: "project-depression-chatbot.appspot.com",
  messagingSenderId: "208984852072",
  appId: "1:208984852072:web:b834bff2506abb18131ddd",
};

const app = initializeApp(firebaseConfig);

export default app;
