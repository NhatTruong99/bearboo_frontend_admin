import moment from "moment";
import { Link } from "react-router-dom";

function PopupReportDetail({ handleClose, report }) {
  const renderReason = (reason) => {
    let list = reason.split("-");
    list.shift();
    return list.map((reason, index) => (
      <p className="ml-3 mb-2" key={index}>
        -{reason}
      </p>
    ));
  };
  const dataState = {
    keyword:
      report.recipientIden == 1
        ? report.recipientInfo.shopName
        : report.recipientIden == 2
        ? report.recipientInfo.accountName
        : report.recipientInfo.name,
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
            <p>Chi tiết báo cáo</p>
          </div>
          <div className="ml-2">
            <div className="">
              <div className="d-flex report-info">
                <p className="popup-report-item-title">Thời gian:</p>{" "}
                <p className="popup-report-item-time">
                  {moment(report.createdAt).format("HH:mm:ss - DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <hr className="mt-1" />
            <div className="">
              <div className="d-flex report-info">
                {" "}
                <p className="popup-report-item-title">Người báo cáo:</p>{" "}
                {report.senderIden == 1 ? (
                  <p className="report-tag report-tag-shop mb-2">Người bán</p>
                ) : (
                  <p className="report-tag report-tag-user mb-2">Người mua</p>
                )}
              </div>

              {report.senderIden == 1 ? (
                <div className="d-flex align-items-center popup-report-item">
                  <img src={report.senderInfo.avatar} />
                  <p>{report.senderInfo.shopName}</p>
                </div>
              ) : (
                //user
                <div className="d-flex align-items-center popup-report-item">
                  <img src={report.senderInfo.avatar} />
                  <p>{report.senderInfo.accountName}</p>
                </div>
              )}
            </div>
            <hr />

            <div className="">
              <div className="d-flex report-info">
                {" "}
                <p className="popup-report-item-title">
                  Đối tượng bị báo cáo:
                </p>{" "}
                {report.recipientIden == 1 ? (
                  <p className="report-tag report-tag-shop mb-2">Người bán</p>
                ) : report.recipientIden == 2 ? (
                  <p className="report-tag report-tag-user mb-2">Người mua</p>
                ) : (
                  <p className="report-tag report-tag-product mb-2">Sản phẩm</p>
                )}
              </div>
              {report.recipientIden == 1 ? (
                <div className="d-flex align-items-center popup-report-item">
                  <img src={report.recipientInfo.avatar} />
                  <p>{report.recipientInfo.shopName}</p>
                </div>
              ) : report.recipientIden == 2 ? (
                //user
                <div className="d-flex align-items-center popup-report-item">
                  <img src={report.recipientInfo.avatar} />
                  <p>{report.recipientInfo.accountName}</p>
                </div>
              ) : (
                //product
                <div className="d-flex align-items-center popup-report-item">
                  <img src={report.recipientInfo.image} />
                  <p>{report.recipientInfo.name}</p>
                </div>
              )}
            </div>
            <hr />
            <div className="">
              <p className="popup-report-item-title">Lý do báo cáo:</p>
              <div>{renderReason(report.reason)}</div>
            </div>
          </div>

          <div className=" d-flex justify-content-end border-0">
            <button
              className="btn btn-info mr-3 user-button"
              onClick={handleClose}
            >
              Trở lại
            </button>

            <Link
              className="btn btn-danger user-button"
              style={{ color: "white" }}
              to={
                report.recipientIden == 1
                  ? "/shop"
                  : report.recipientIden == 2
                  ? "/user"
                  : "/product"
              }
              state={dataState}
            >
              Khóa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupReportDetail;
