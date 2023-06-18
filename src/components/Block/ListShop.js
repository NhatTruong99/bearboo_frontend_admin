import { useEffect, useReducer, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductService from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { setSideBarIndex } from "../../actions/admin";
import "./product.css";
import ShopService from "../../services/shopService";
import BlockService from "../../services/blockService";
import PopupBlock from "./PopupBlock";
import PopupUnBlock from "./PopupUnblock";
import PopupReason from "./PopupReason";
var _ = require("lodash");
function ListShop() {
  const location = useLocation();
  const [listShop, setListShop] = useState([]);
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
    let action = setSideBarIndex(2);
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
      ShopService.searchShop({
        ...filters,
        order: "blockedAt",
        shopName: keyword,
        email: keyword,
        userName: keyword,
        phoneNumber: keyword,
      }).then((res) => {
        res.data.data.map((shop) => {
          setIsOpenPopupBlock((isOpenPopup) => ({
            ...isOpenPopup,
            [shop.id]: false,
          }));
        });
        res.data.data.map((shop) => {
          setIsOpenPopupReason((isOpenPopup) => ({
            ...isOpenPopup,
            [shop.id]: false,
          }));
        });
        setListShop(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    } else {
      ShopService.getAllShop({ ...filters, order: "blockedAt" }).then((res) => {
        res.data.data.map((shop) => {
          setIsOpenPopupBlock((isOpenPopup) => ({
            ...isOpenPopup,
            [shop.id]: false,
          }));
        });
        res.data.data.map((shop) => {
          setIsOpenPopupReason((isOpenPopup) => ({
            ...isOpenPopup,
            [shop.id]: false,
          }));
        });
        setListShop(res.data.data);
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
      {listShop && (
        <div className="row">
          <ToastContainer autoClose={3000} />
          <div className="col-12">
            <div className="card">
              <div className="card-body text-left">
                <h5 className=" text-center mb-4">Danh sách shop bán hàng</h5>
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
                {listShop &&
                  listShop.map((shop) => (
                    <div key={shop.id}>
                      {_.get(isOpenPopupBlock, shop.id) && (
                        <PopupBlock
                          handleClose={() => togglePopupBlock(shop.id)}
                          handleChange={() => setChange(!change)}
                          shop={shop}
                        />
                      )}
                    </div>
                  ))}
                {listShop &&
                  listShop.map((shop) => (
                    <div key={shop.id}>
                      {_.get(isOpenPopupReason, shop.id) && (
                        <PopupReason
                          handleClose={() => togglePopupReason(shop.id)}
                          handleChange={() => setChange(!change)}
                          shop={shop}
                        />
                      )}
                    </div>
                  ))}
                <table className="table dt-responsive nowrap table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>Tên shop</th>
                      <th>Ảnh</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Tên chủ shop</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listShop &&
                      listShop.map((shop) => (
                        <tr key={shop.id}>
                          <td style={{ maxWidth: "200px" }}>{shop.shopName}</td>
                          <td>
                            <img
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                              src={shop.avatar}
                            />
                          </td>
                          <td>{shop.email}</td>
                          <td>{shop.phoneNumber}</td>
                          <td>{shop.userName}</td>
                          <td>
                            <div className="d-flex">
                              {!shop.blockedAt ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => togglePopupBlock(shop.id)}
                                >
                                  Khóa
                                </button>
                              ) : (
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success mr-3"
                                    onClick={() => togglePopupReason(shop.id)}
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
export default ListShop;
