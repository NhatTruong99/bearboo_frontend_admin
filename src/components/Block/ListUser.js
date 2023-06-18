import { useEffect, useReducer, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { setSideBarIndex } from "../../actions/admin";
import "./product.css";
import UserService from "../../services/userService";
import BlockService from "../../services/blockService";
import PopupBlock from "./PopupBlock";
import PopupUnBlock from "./PopupUnblock";
import PopupReason from "./PopupReason";
var _ = require("lodash");
function ListUser() {
  const location = useLocation();
  const [listUser, setListUser] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [change, setChange] = useState(false);
  const [isOpenPopupBlock, setIsOpenPopupBlock] = useState({});
  const [isOpenPopupUnBlock, setIsOpenPopupUnBlock] = useState({});
  const [isOpenPopupReason, setIsOpenPopupReason] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 5,
    totalPage: 1,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let action = setSideBarIndex(3);
    dispatch(action);
    if (location.state?.keyword) {
      setKeyWord(location.state?.keyword);
    }
  }, []);
  useEffect(() => {
    setIsOpenPopupBlock({});
    setIsOpenPopupUnBlock({});
    setIsOpenPopupReason({});
    if (keyword) {
      UserService.searchUser({
        ...filters,
        accountName: keyword,
        email: keyword,
        fullName: keyword,
        order: "blockedAt",
      }).then((res) => {
        res.data.data.map((user) => {
          setIsOpenPopupBlock((isOpenPopup) => ({
            ...isOpenPopup,
            [user.id]: false,
          }));
        });
        res.data.data.map((user) => {
          setIsOpenPopupReason((isOpenPopup) => ({
            ...isOpenPopup,
            [user.id]: false,
          }));
        });
        setListUser(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    } else {
      UserService.getAllUser({ ...filters, order: "blockedAt" }).then((res) => {
        res.data.data.map((user) => {
          setIsOpenPopupBlock((isOpenPopup) => ({
            ...isOpenPopup,
            [user.id]: false,
          }));
        });
        res.data.data.map((user) => {
          setIsOpenPopupReason((isOpenPopup) => ({
            ...isOpenPopup,
            [user.id]: false,
          }));
        });
        setListUser(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    }
  }, [change, filters, keyword]);

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const togglePopupBlock = (id) => {
    setIsOpenPopupBlock((isOpenPopup) => ({
      ...isOpenPopup,
      [id]: !_.get(isOpenPopupBlock, id),
    }));
  };
  const togglePopupReason = (id) => {
    setIsOpenPopupReason((isOpenPopup) => ({
      ...isOpenPopup,
      [id]: !_.get(isOpenPopupReason, id),
    }));
  };
  return (
    <>
      {listUser && (
        <div className="row">
          <ToastContainer autoClose={3000} />
          <div className="col-12">
            <div className="card">
              <div className="card-body text-left">
                <h5 className=" text-center mb-4">Danh sách người dùng</h5>
                <div className="d-flex justify-content-end mb-3">
                  <div className="search-container">
                    <i className="fa fa-search"></i>
                    <input
                      value={keyword}
                      type="text"
                      placeholder="Tìm kiếm..."
                      onChange={(e) => setKeyWord(e.target.value)}
                    />
                  </div>
                </div>
                {listUser &&
                  listUser.map((user) => (
                    <div key={user.id}>
                      {_.get(isOpenPopupBlock, user.id) && (
                        <PopupBlock
                          handleClose={() => togglePopupBlock(user.id)}
                          handleChange={() => setChange(!change)}
                          user={user}
                        />
                      )}
                    </div>
                  ))}
                {listUser &&
                  listUser.map((user) => (
                    <div key={user.id}>
                      {_.get(isOpenPopupReason, user.id) && (
                        <PopupReason
                          handleClose={() => togglePopupReason(user.id)}
                          handleChange={() => setChange(!change)}
                          user={user}
                        />
                      )}
                    </div>
                  ))}
                <table className="table dt-responsive nowrap table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>Tên tài khoản</th>
                      <th>Ảnh </th>
                      <th>Email</th>
                      <th>Tên người dùng</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser &&
                      listUser.map((user) => (
                        <tr key={user.id}>
                          <td style={{ maxWidth: "200px" }}>
                            {user.accountName}
                          </td>
                          <td>
                            <img
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                              src={user.avatar}
                            />
                          </td>
                          <td>{user.email}</td>
                          <td>{user.fullName}</td>
                          <td>
                            <div className="d-flex">
                              {!user.blockedAt ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => togglePopupBlock(user.id)}
                                >
                                  Khóa
                                </button>
                              ) : (
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success mr-3"
                                    onClick={() => togglePopupReason(user.id)}
                                  >
                                    Mở khóa
                                  </button>
                                </div>
                              )}
                            </div>
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
      )}
    </>
  );
}
export default ListUser;
