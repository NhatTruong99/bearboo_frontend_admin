import { useEffect, useState } from "react";
import BlockService from "../../services/blockService";
import { toast } from "react-toastify";
import Validation from "../../utils/validation";
import { addDocument } from "../../firebase/service";
function PopupBlock({ handleClose, handleChange, product, shop, user }) {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [errors, setErrors] = useState({});
  const handleReason = (e) => {
    if (e.target.checked) {
      setReason((reason) => reason + "-" + e.target.value);
    } else {
      setReason((reason) => reason.replace("-" + e.target.value, ""));
    }
  };
  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      (reason != "" || otherReason != "")
    ) {
      document.getElementById("btn-block-create").disabled = true;
      let finalReason = reason;
      if (otherReason) {
        finalReason += "-" + otherReason;
      }
      if (product) {
        let data = {
          productId: product.id,
          blockBy: 1, // 1:admin, 2: shop
          reason: finalReason,
        };
        const dataAPI = BlockService.blockProduct(data).then(() => {
          handleChange();
          handleClose();
          // senderIden: 1 shop, 2 user, 3admin
          // recipientIden: 1 admin, 2 shop, 3 user
          // type: 1: đặt đơn hàng, 2: duyệt đơn hàng, 3: giao hàng thành công, 4: báo cáo, 5: block sản phẩm
          let dataNotification = {
            productId: product.id,
            shopId: product.Shop.id,
            senderIden: 3,
            recipientIden: 2,
            type: 5,
          };
          addDocument("notifications", dataNotification);
        });
        toast.promise(dataAPI, {
          pending: "Đang tiến hành khóa...",
          success: "Khóa sản phẩm thành công",
          error: "Khóa không thành công",
        });
      } else if (user) {
        let data = {
          userId: user.id,
          blockBy: 1, // 1:admin, 2: shop
          reason: finalReason,
        };
        const dataAPI = BlockService.blockUser(data).then(() => {
          handleChange();
          handleClose();
        });
        toast.promise(dataAPI, {
          pending: "Đang tiến hành khóa...",
          success: "Khóa người dùng thành công",
          error: "Khóa không thành công",
        });
      } else if (shop) {
        let data = {
          shopId: shop.id,
          blockBy: 1, // 1:admin, 2: shop
          reason: finalReason,
        };
        const dataAPI = BlockService.blockShop(data).then(() => {
          handleChange();
          handleClose();
        });
        toast.promise(dataAPI, {
          pending: "Đang tiến hành khóa...",
          success: "Khóa shop thành công",
          error: "Khóa không thành công",
        });
      }
    }
  }, [errors]);
  const handleBlock = () => {
    let finalReason = reason;
    if (otherReason) {
      finalReason += "-" + otherReason;
    }
    setErrors(Validation.validationBlock({ reason: finalReason }));
  };
  const renderReasonProduct = () => {
    return (
      <div className="popup-reason-list">
        {" "}
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Sản phẩm bị cấm buôn bán"}
            onChange={(e) => handleReason(e)}
            id="reason-1"
          />
          <label className="form-check-label" for="reason-1">
            Sản phẩm bị cấm buôn bán
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Hàng giả, hàng nhái"}
            onChange={(e) => handleReason(e)}
            id="reason-2"
          />
          <label className="form-check-label" for="reason-2">
            Hàng giả, hàng nhái
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Sản phẩm có hình ảnh, nội dung phản cảm"}
            onChange={(e) => handleReason(e)}
            id="reason-3"
          />
          <label className="form-check-label" for="reason-3">
            Sản phẩm có hình ảnh, nội dung phản cảm
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Tên sản phẩm không phù hợp với hình ảnh sản phẩm"}
            onChange={(e) => handleReason(e)}
            id="reason-4"
          />
          <label className="form-check-label" for="reason-4">
            Tên sản phẩm không phù hợp với hình ảnh sản phẩm
          </label>
        </div>
        <div className="form-group">
          <label>Khác:</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setOtherReason(e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  };
  const renderReasonUser = () => {
    return (
      <div className="popup-reason-list">
        {" "}
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người dùng có dấu hiệu lừa đảo"}
            onChange={(e) => handleReason(e)}
            id="reason-1"
          />
          <label className="form-check-label" for="reason-1">
            Người dùng có dấu hiệu lừa đảo
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người dùng gửi tin nhắn có nội dung không lịch sự"}
            onChange={(e) => handleReason(e)}
            id="reason-2"
          />
          <label className="form-check-label" for="reason-2">
            Người dùng gửi tin nhắn có nội dung không lịch sự
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={
              "Người dùng đánh giá sản phẩm có hình ảnh, nội dung phản cảm"
            }
            onChange={(e) => handleReason(e)}
            id="reason-3"
          />
          <label className="form-check-label" for="reason-3">
            Người dùng đánh giá sản phẩm có hình ảnh, nội dung phản cảm
          </label>
        </div>
        <div className="form-group">
          <label>Khác:</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setOtherReason(e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  };
  const renderReasonShop = () => {
    return (
      <div className="popup-reason-list">
        {" "}
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người bán có dấu hiệu lừa đảo"}
            onChange={(e) => handleReason(e)}
            id="reason-1"
          />
          <label className="form-check-label" for="reason-1">
            Người bán có dấu hiệu lừa đảo
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người bán có đăng sản phẩm cấm"}
            onChange={(e) => handleReason(e)}
            id="reason-2"
          />
          <label className="form-check-label" for="reason-2">
            Người bán có đăng sản phẩm cấm
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người bán có đăng sản phẩm giả/nhái"}
            onChange={(e) => handleReason(e)}
            id="reason-3"
          />
          <label className="form-check-label" for="reason-3">
            Người bán có đăng sản phẩm giả/nhái
          </label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value={"Người bán gửi tin nhắn có nội dung không lịch sự"}
            onChange={(e) => handleReason(e)}
            id="reason-4"
          />
          <label className="form-check-label" for="reason-4">
            Người bán gửi tin nhắn có nội dung không lịch sự
          </label>
        </div>
        <div className="form-group">
          <label>Khác:</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setOtherReason(e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  };
  return (
    <div className="popup-box">
      <div
        className="box"
        style={{
          width: "40%",
          marginTop: "80px",
          paddingBottom: "20px",
          maxHeight: "80vh",
        }}
      >
        <span className="close-icon" onClick={handleClose}>
          <i className="mdi mdi-close-circle-outline"></i>
        </span>
        <div>
          <div className="popup-title">
            <p>
              {product
                ? "Khóa sản phẩm"
                : user
                ? "Khóa khách hàng"
                : "Khóa shop bán hàng"}
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

            {product
              ? renderReasonProduct()
              : user
              ? renderReasonUser()
              : renderReasonShop()}
          </div>
          {errors.reason && (
            <p className="mess-error text-right">{errors.reason}</p>
          )}
          <div className=" d-flex justify-content-end border-0">
            <button className="btn btn-info user-button" onClick={handleClose}>
              Trở lại
            </button>
            <button
              className="btn btn-danger ml-4 user-button"
              id="btn-block-create"
              onClick={handleBlock}
            >
              Khóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupBlock;
