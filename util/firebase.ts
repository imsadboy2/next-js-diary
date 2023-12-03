import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  storageBucket: 'gs://next-js-diary.appspot.com'
};

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { app, storage }