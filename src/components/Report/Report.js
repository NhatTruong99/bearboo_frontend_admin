import { ToastContainer } from "react-toastify";
import Pagination from "../Block/Pagination";
import { useEffect, useState } from "react";
import ReportService from "../../services/reportService";
import { setSideBarIndex } from "../../actions/admin";
import { useDispatch } from "react-redux";
import "./report.css";
import moment from "moment/moment";
import _ from "lodash";
import PopupReportDetail from "./PopupReportDetail";
function Report() {
  const dispatch = useDispatch();
  const [listReport, setListReport] = useState([]);
  const [currentRecipientId, setCurrentRecipientId] = useState(0);
  const [isOpenPopupReport, setIsOpenPopupReport] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 5,
    totalPage: 1,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });
  useEffect(() => {
    let action = setSideBarIndex(7);
    dispatch(action);
  }, []);
  useEffect(() => {
    if (currentRecipientId == 0) {
      ReportService.getAllReport(filters).then((res) => {
        res.data.data.map((reason) => {
          setIsOpenPopupReport((isOpenPopup) => ({
            ...isOpenPopup,
            [reason.id]: false,
          }));
        });
        setListReport(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    } else {
      ReportService.getAllReport({
        ...filters,
        recipientIden: currentRecipientId,
      }).then((res) => {
        setListReport(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    }
  }, [filters, currentRecipientId]);
  const handleCurrentRecipient = (e) => {
    setCurrentRecipientId(e.target.value);
    setFilters({
      ...filters,
      page: 1,
      limit: 5,
    });
  };
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };
  const renderReason = (reason) => {
    let list = reason.split("-");
    list.shift();
    return list.map((reason) => <p>-{reason}</p>);
  };
  const togglePopupReport = (id) => {
    setIsOpenPopupReport((isOpenPopup) => ({
      ...isOpenPopup,
      [id]: !_.get(isOpenPopupReport, id),
    }));
  };
  return (
    <div className="row">
      <ToastContainer autoClose={3000} />
      <div className="col-12">
        <div className="card">
          <div className="card-body text-left">
            <h5 className=" text-center mb-4">Danh sách báo cáo</h5>
            <div className="d-flex form-group mr-5 row align-items-center">
              <label className="mb-0 mr-2">Đối tượng bị báo cáo:</label>
              <select
                className="form-control "
                style={{ width: "150px" }}
                onChange={(e) => handleCurrentRecipient(e)}
              >
                <option key={0} value={0}>
                  Toàn bộ
                </option>
                <option key={1} value={1}>
                  Người bán
                </option>
                <option key={2} value={2}>
                  Người dùng
                </option>
                <option key={3} value={3}>
                  Sản phẩm
                </option>
              </select>
            </div>
            {listReport &&
              listReport.map((report) => (
                <div key={report.id}>
                  {_.get(isOpenPopupReport, report.id) && (
                    <PopupReportDetail
                      handleClose={() => togglePopupReport(report.id)}
                      report={report}
                    />
                  )}
                </div>
              ))}
            <table className="table dt-responsive nowrap table-bordered table-striped table-report">
              <thead>
                <tr>
                  <th>Người báo cáo</th>
                  <th>Đối tượng bị báo cáo</th>
                  <th>Lý do</th>
                  <th>Thời gian </th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {listReport &&
                  listReport.map((report) => (
                    <tr key={report.id}>
                      <td style={{ maxWidth: "230px" }}>
                        <div className="d-flex report-info align-items-center">
                          {report.senderIden == 1 ? (
                            <p className="report-tag report-tag-shop">
                              Người bán
                            </p>
                          ) : (
                            <p className="report-tag report-tag-user">
                              Người mua
                            </p>
                          )}
                          <img
                            className="report-info-avatar-user"
                            src={report.senderInfo.avatar}
                          />
                          <p className="report-info-name">
                            {report.senderIden == 1
                              ? report.senderInfo.shopName
                              : report.senderInfo.accountName}
                          </p>
                        </div>
                      </td>
                      <td style={{ maxWidth: "250px" }}>
                        <div className="d-flex report-info align-items-center">
                          {report.recipientIden == 1 ? (
                            <p className="report-tag report-tag-shop">
                              Người bán
                            </p>
                          ) : report.recipientIden == 2 ? (
                            <p className="report-tag report-tag-user">
                              Người mua
                            </p>
                          ) : (
                            <p className="report-tag report-tag-product">
                              Sản phẩm
                            </p>
                          )}
                          <img
                            className={
                              report.recipientIden == 3
                                ? "report-info-avatar-product"
                                : "report-info-avatar-user"
                            }
                            src={
                              report.recipientIden == 3
                                ? report.recipientInfo.image
                                : report.recipientInfo.avatar
                            }
                          />
                          <p className="report-info-name">
                            {report.recipientIden == 1
                              ? report.recipientInfo.shopName
                              : report.recipientIden == 2
                              ? report.recipientInfo.accountName
                              : report.recipientInfo.name}
                          </p>
                        </div>
                      </td>
                      <td style={{ maxWidth: "250px" }}>
                        <div className="report-reason">
                          {renderReason(report.reason)}
                        </div>
                      </td>
                      <td className="">
                        {moment(report.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => togglePopupReport(report.id)}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Report;
