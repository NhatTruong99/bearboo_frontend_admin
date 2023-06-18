import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import db from "./config";

export const getDataCollection = async (nameCollection) => {
  const docRef = query(
    collection(db, nameCollection),
    where("capital", "==", true)
  );
  const querySnapshot = await getDocs(collection(db, nameCollection));
  let list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push({ id: doc.id, data: doc.data() });
  });
  return list;
};

export const addDocument = (nameCollection, data) => {
  return addDoc(collection(db, nameCollection), {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
    removedAt: null,
    readedAt: null,
  });
};
export const updateRemovedTime = (nameCollection, id) => {
  const ref = doc(db, nameCollection, id);
  return updateDoc(ref, {
    removedAt: Timestamp.fromDate(new Date()),
  });
};
export const updateReadedTime = (nameCollection, id) => {
  const ref = doc(db, nameCollection, id);
  return updateDoc(ref, {
    readedAt: Timestamp.fromDate(new Date()),
  });
};
