require('dotenv').config()
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, updateDoc,collection, getDocs, query, where
} = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
};

let app;

const initFireBaseApp = () => {
    try {
        if (!app) {
            app = initializeApp(firebaseConfig);
        }
        return app;
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        throw error;
    }
}

class CrudService {
  constructor() {
    this.init();
  }

  async init() {
    try {
      await initFireBaseApp();
      this.fireStoreDB = getFirestore();
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }
  async readData(entityName) {
    try {
      let arr = [];
      const doc_ = await getDocs(
        query(collection(this.fireStoreDB, entityName))
      );
      doc_.forEach((doc) => arr.push(doc.data()));
      return arr;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createData(entityName, resBody, ID) {
    try {
      const document = doc(this.fireStoreDB, entityName, ID);
      const created = await setDoc(document, resBody);
      return created;
    } catch (error) {
      console.error(error);
    }
  }
  async updateData(entityName, resBody, ID) {
    try {
      const document = doc(this.fireStoreDB, entityName, ID);
      const updated = await updateDoc(document, resBody);
      return updated;
    } catch (error) {
      console.error(error);
    }
  }
}

const CRUDService = new CrudService();
module.exports = { initFireBaseApp, CRUDService };
