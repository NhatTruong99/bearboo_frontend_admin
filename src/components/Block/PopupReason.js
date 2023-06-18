import { useEffect, useState } from "react";
import BlockService from "../../services/blockService";
import { toast } from "react-toastify";
import Validation from "../../utils/validation";

function PopupReason({ handleClose, handleChange, product, shop, user }) {
  const [reasons, setReasons] = useState([]);
  const [reasonItem, setReasonItem] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [blockShop, setBlockShop] = useState(false);
  useEffect(() => {
    let data = {};
    if (product) {
      data = { productId: product.id };
    } else if (user) {
      data = { userId: user.id };
    } else if (shop) {
      data = { shopId: shop.id };
    }
    BlockService.getReasonBlock(data).then((res) => {
      let reasonString = res.data.reason;
      if (
        res.data?.Product?.Shop.blockedAt &&
        res.data.reason != "Shop đã bị khóa."
      ) {
        reasonString += "-Shop đã bị khóa.";
      }
      setReasonItem(res.data);
      setReasons(reasonString.split("-"));
      if (res.data.blockBy == 2 || res.data?.Product?.Shop.blockedAt) {
        setDisableButton(true);
      }
    });
  }, []);
  const handleUnBlock = () => {
    if (product) {
      const dataAPI = BlockService.unBlockProduct(product.id).then(() => {
        handleClose();
        handleChange();
      });
      toast.promise(dataAPI, {
        pending: "Đang tiến hành mở khóa...",
        success: "Mở khóa sản phẩm thành công",
        error: "Mở khóa không thành công",
      });
    } else if (user) {
      const dataAPI = BlockService.unBlockUser(user.id).then(() => {
        handleClose();
        handleChange();
      });
      toast.promise(dataAPI, {
        pending: "Đang tiến hành mở khóa...",
        success: "Mở khóa người dùng thành công",
        error: "Mở khóa không thành công",
      });
    } else if (shop) {
      const dataAPI = BlockService.unBlockShop(shop.id).then(() => {
        handleClose();
        handleChange();
      });
      toast.promise(dataAPI, {
        pending: "Đang tiến hành mở khóa...",
        success: "Mở khóa shop thành công",
        error: "Mở khóa không thành công",
      });
    }
  };
  const renderReason = () => {
    if (reasonItem) {
      if (reasonItem?.Product?.Shop.blockedAt) {
        return (
          <div>
            <p style={{ color: "#f72a2a" }}>
              Cần mở khóa shop để mở khóa sản phẩm này.
            </p>
          </div>
        );
      } else if (reasonItem?.blockBy == 2) {
        return (
          <div>
            <p style={{ color: "#f72a2a" }}>Sản phẩm bị khóa bởi shop.</p>
          </div>
        );
      }
    }
  };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          <i className="mdi mdi-close-circle-outline"></i>
        </span>
        <div>
          <div className="popup-title">
            <p>
              {product ? "Sản phẩm" : user ? "Khách hàng" : "Shop bán hàng"}
            </p>
          </div>
          {product ? (
            //product
            <div className="d-flex  align-items-center popup-item">
              <img src={product.image} />
              <p>{product.name}</p>
            </div>
          ) : user ? (
            //user
            <div className="d-flex align-items-center popup-item">
              <img src={user.avatar} />
              <p>{user.accountName}</p>
            </div>
          ) : (
            //shop
            <div className="d-flex align-items-center popup-item">
              <img src={shop.avatar} />
              <p>{shop.shopName}</p>
            </div>
          )}
          <hr />
          <div className="popup-reason">
            <p className="popup-reason-title">Lý do khóa</p>
            <div className="popup-reason-list">
              {reasons.map((reason, index) => (
                <p key={index}>{reason && "- " + reason}</p>
              ))}
            </div>
          </div>
          {renderReason()}
          <div className=" d-flex justify-content-end border-0">
            <button
              className="btn btn-info mr-3 user-button"
              onClick={handleClose}
            >
              Trở lại
            </button>
            <button
              className="btn btn-success user-button"
              onClick={handleUnBlock}
              disabled={disableButton}
            >
              Mở khóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupReason;
