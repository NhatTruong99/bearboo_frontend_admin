import { useEffect, useState } from "react";
import "./notification.css";
import db from "../../firebase/config";
import moment from "moment";
import {
  addDocument,
  getDataCollection,
  updateReadedTime,
  updateRemovedTime,
} from "../../firebase/service";
import {
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
} from "firebase/firestore";
import NotificationDetail from "./NotificationDetail";
function Notification() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [listNotification, setListNotification] = useState([]);
  useEffect(() => {
    let messageRef = query(
      collection(db, "notifications"),
      orderBy("createdAt"),
      where("recipientIden", "==", 1),
      where("readedAt", "==", null)
    );
    const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
      let notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ ...doc.data(), id: doc.id });
      });
      setListNotification(notifications);
    });
    return unsubscribe;
  }, []);
  return (
    <div className="dropdown d-inline-block noti-icon">
      <button
        type="button"
        className="btn header-item noti-icon waves-effect"
        onClick={() => setIsOpenPopup(!isOpenPopup)}
      >
        <i className="mdi mdi-bell"></i>
        {listNotification.length > 0 && (
          <span className="badge badge-danger badge-pill">
            {listNotification.length}
          </span>
        )}
      </button>
      {isOpenPopup == true ? <NotificationDetail /> : ""}
    </div>
  );
}
export default Notification;
