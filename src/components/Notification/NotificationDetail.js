import { useEffect, useState } from "react";
import db from "../../firebase/config";
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
import ShopService from "../../services/shopService";
import UserService from "../../services/userService";
import moment from "moment";
function NotificationDetail() {
  const [listNotification, setListNotification] = useState([]);
  useEffect(() => {
    let messageRef = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      where("recipientIden", "==", 1)
    );
    const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
      let notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ ...doc.data(), id: doc.id });
        if (doc.data().recipientIden == 1 && doc.data().readedAt == null) {
          updateReadedTime("notifications", doc.id);
        }
      });
      checkInfomation(notifications).then((res) => {
        setListNotification((listNotification) => [...res]);
      });
    });
    return unsubscribe;
  }, []);
  console.log(listNotification);
  const checkInfomation = async (list) => {
    const check = async (item) => {
      let itemResult = {};
      if (item.userId && item.senderIden == 2) {
        const user = await UserService.getUserById(item.userId);
        itemResult = { ...item, userInfo: user.data };
      } else if (item.shopId && item.senderIden == 1) {
        const shop = await ShopService.getShopById(item.shopId);
        itemResult = { ...item, shopInfo: shop.data };
      } else {
        itemResult = { ...item };
      }
      return itemResult;
    };
    let listResult = [];
    for (let i = 0; i < list.length; i++) {
      await check(list[i]).then((res) => listResult.push(res));
    }
    return listResult;
  };
  return (
    <div className="header__notify">
      <header className="header__notify-header">
        <h3>Thông báo</h3>
      </header>
      <ul className="header__notify-list">
        {listNotification &&
          listNotification.map((notification) => (
            <li className="header__notify-item " key={notification.id}>
              <a href="/report" className="header__notify-link">
                <img
                  src={
                    notification.senderIden == 1
                      ? notification.shopInfo?.avatar
                      : notification.userInfo?.avatar
                  }
                  alt=""
                  className="header__notify-img"
                />
                <div className="header__notify-info">
                  {notification.senderIden == 1 && (
                    <span className="header__notify-description">
                      {notification.shopId && notification.userId ? (
                        <span>
                          <b>{notification.shopInfo?.shopName}</b> đã gửi 1 báo
                          cáo <b style={{ color: "#9715b2" }}>khách hàng!</b>
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  )}
                  {notification.senderIden == 2 && (
                    <span className="header__notify-description">
                      {notification.userId && notification.productId ? (
                        <span>
                          <b>{notification.userInfo?.accountName}</b> đã gửi 1
                          báo cáo <b style={{ color: "#31a001" }}>sản phẩm!</b>
                        </span>
                      ) : (
                        <span>
                          <b>{notification.userInfo?.accountName}</b> đã gửi 1
                          báo cáo{" "}
                          <b style={{ color: "#0087CA" }}>shop bán hàng!</b>
                        </span>
                      )}
                    </span>
                  )}

                  <p className="header__notify-time">
                    {" "}
                    {moment(notification.createdAt.toDate()).calendar(null, {
                      sameDay: "[Hôm nay] kk:mm",
                      lastDay: "[Hôm qua] kk:mm",
                      lastWeek: "kk:mm DD [tháng] MM, YYYY",
                      sameElse: "kk:mm DD [tháng] MM, YYYY",
                    })}
                  </p>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default NotificationDetail;
