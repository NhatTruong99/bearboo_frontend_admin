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
function ListProduct() {
  const location = useLocation();
  const [listProduct, setListProduct] = useState([]);
  const [currentShopId, setCurrentShopId] = useState(0);
  const [listShop, setListShop] = useState([]);
  const [change, setChange] = useState(false);
  const [keyword, setKeyWord] = useState("");
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
    let action = setSideBarIndex(4);
    dispatch(action);
    ShopService.getAllShop({ page: 1, limit: 1000 }).then((res) =>
      setListShop(res.data.data)
    );
    if (location.state?.keyword) {
      setKeyWord(location.state?.keyword);
    }
  }, []);
  console.log(location.state);
  useEffect(() => {
    setIsOpenPopupBlock({});
    if (currentShopId != 0 || keyword != "") {
      let param = {
        keyword: keyword,
      };
      if (currentShopId != 0) {
        param.shopId = currentShopId;
      }
      ProductService.searchProduct({
        order: "blockedAt",
        ...param,
        ...filters,
        withBlocked: true,
      }).then((res) => {
        res.data.data.map((product) => {
          setIsOpenPopupBlock((isOpenPopup) => ({
            ...isOpenPopup,
            [product.id]: false,
          }));
        });
        res.data.data.map((product) => {
          setIsOpenPopupReason((isOpenPopup) => ({
            ...isOpenPopup,
            [product.id]: false,
          }));
        });
        setListProduct(res.data.data);
        setPagination({
          ...pagination,
          totalPage: res.data.totalPage,
          currentPage: res.data.currentPage,
        });
      });
    } else if (currentShopId == 0) {
      ProductService.getAllProduct({ ...filters, order: "blockedAt" }).then(
        (res) => {
          res.data.data.map((product) => {
            setIsOpenPopupBlock((isOpenPopup) => ({
              ...isOpenPopup,
              [product.id]: false,
            }));
          });
          res.data.data.map((product) => {
            setIsOpenPopupReason((isOpenPopup) => ({
              ...isOpenPopup,
              [product.id]: false,
            }));
          });
          setListProduct(res.data.data);
          setPagination({
            ...pagination,
            totalPage: res.data.totalPage,
            currentPage: res.data.currentPage,
          });
        }
      );
    }
  }, [change, filters, currentShopId, keyword]);

  const handleCurrentShop = (shopId) => {
    setCurrentShopId(shopId);
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
      {listProduct && (
        <div className="row">
          <ToastContainer autoClose={3000} />
          <div className="col-12">
            <div className="card">
              <div className="card-body text-left">
                <h5 className=" text-center mb-4">Danh sách sản phẩm</h5>
                <div className=" d-flex justify-content-between align-item">
                  <div className="form-group mr-5" style={{ width: "150px" }}>
                    <select
                      value={currentShopId}
                      className="form-control"
                      onChange={(e) => handleCurrentShop(e.target.value)}
                    >
                      <option key={0} value={0}>
                        Toàn bộ shop
                      </option>
                      {listShop.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                          {shop.shopName}
                        </option>
                      ))}
                    </select>
                  </div>
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
                {listProduct &&
                  listProduct.map((product) => (
                    <div key={product.id}>
                      {_.get(isOpenPopupBlock, product.id) && (
                        <PopupBlock
                          handleClose={() => togglePopupBlock(product.id)}
                          handleChange={() => setChange(!change)}
                          product={product}
                        />
                      )}
                    </div>
                  ))}

                {listProduct &&
                  listProduct.map((product) => (
                    <div key={product.id}>
                      {_.get(isOpenPopupReason, product.id) && (
                        <PopupReason
                          handleClose={() => togglePopupReason(product.id)}
                          handleChange={() => setChange(!change)}
                          product={product}
                        />
                      )}
                    </div>
                  ))}
                <table className="table dt-responsive nowrap table-bordered table-striped table-product">
                  <thead>
                    <tr>
                      <th>Tên shop</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh sản phẩm</th>
                      <th>Lượt bán</th>
                      <th>Phân loại</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct &&
                      listProduct.map((product) => (
                        <tr key={product.id}>
                          <td style={{ maxWidth: "500px" }}>
                            <b style={{ color: "#0e81c4" }}>
                              {product.Shop.shopName}
                            </b>
                          </td>
                          <td style={{ maxWidth: "500px" }}>{product.name}</td>
                          <td>
                            <img
                              style={{ width: "100px" }}
                              src={product.image}
                            />
                          </td>
                          <td>{product.saleQuantity}</td>
                          <td>{product.Category.name}</td>

                          <td>
                            <div className="d-flex">
                              {!product.blockedAt ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => togglePopupBlock(product.id)}
                                >
                                  Khóa
                                </button>
                              ) : (
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success mr-3"
                                    onClick={() =>
                                      togglePopupReason(product.id)
                                    }
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
export default ListProduct;
