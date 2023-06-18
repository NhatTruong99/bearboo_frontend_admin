import { useEffect, useReducer, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { setSideBarIndex } from "../../actions/admin";
import "./product.css";
import ShopService from "../../services/shopService";
import BlockService from "../../services/blockService";
function ListShop() {
  const [currentShopId, setCurrentShopId] = useState(0);
  const [listShop, setListShop] = useState([]);
  const [change, setChange] = useState(false);
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
    ShopService.getAllShop({ ...filters, order: "blockedAt" }).then((res) => {
      setListShop(res.data.data);
      setPagination({
        ...pagination,
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    });
  }, [filters, change]);

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };
  const handleBlockShop = (id) => {
    BlockService.blockShop(id).then(() => setChange(!change));
  };
  const handleUnBlockShop = (id) => {
    BlockService.unBlockShop(id).then(() => setChange(!change));
  };
  return (
    <>
      {listShop && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-left">
                <h5 className=" text-center mb-4">Danh sách shop bán hàng</h5>
                <table className="table dt-responsive nowrap table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>Tên shop</th>
                      <th>Ảnh shop</th>
                      <th>Email</th>
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
                          <td>{shop.userName}</td>
                          <td>
                            <div className="d-flex ">
                              {!shop.blockedAt ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleBlockShop(shop.id)}
                                >
                                  Khóa
                                </button>
                              ) : (
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleUnBlockShop(shop.id)}
                                >
                                  Mở khóa
                                </button>
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
