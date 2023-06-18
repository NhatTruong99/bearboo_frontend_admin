import { toast } from "react-toastify";
import BlockService from "../../services/blockService";

function PopupUnBlock({ handleClose, handleChange, product, shop, user }) {
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
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          <i className="mdi mdi-close-circle-outline"></i>
        </span>
        <div>
          <div className="popup-title">
            <p>
              {product
                ? "Mở khóa sản phẩm"
                : user
                ? "Mở khóa khách hàng"
                : "Mở khóa shop bán hàng"}
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
            <p className="popup-reason-title text-center mb-4">
              Bạn có chắc chắn muốn mở khóa?
            </p>
          </div>
          <div className=" d-flex justify-content-end border-0">
            <button className="btn btn-info user-button" onClick={handleClose}>
              Trở lại
            </button>
            <button
              className="btn btn-success ml-4 user-button"
              id="btn-block-create"
              onClick={handleUnBlock}
            >
              Mở khóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupUnBlock;
