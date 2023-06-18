import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import OrderService from "../../services/orderService";
import { formatVND, getPercent } from "../../utils/helper";
import UserService from "../../services/userService";
import ShopService from "../../services/shopService";

function ChartCardTotal() {
  const [date, setDate] = useState(new Date());
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalShop, setTotalShop] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const [previousTotalSales, setPreviousTotalSales] = useState(0);
  const [previousTotalOrder, setPreviousTotalOrder] = useState(0);
  const [previousTotalShop, setPreviousTotalShop] = useState(0);
  const [previousTotalUser, setPreviousTotalUser] = useState(0);

  useEffect(() => {
    handleGetDataByDate(date);
  }, []);
  const CustomInputDate = forwardRef(({ value, onClick }, ref) => (
    <button
      className="custom-date-input btn btn-primary"
      onClick={onClick}
      ref={ref}
    >
      <i className="fas fa-calendar mr-1"></i>
      {value}
    </button>
  ));
  const CustomInputMonth = forwardRef(({ value, onClick }, ref) => (
    <button
      className="custom-date-input btn btn-primary"
      onClick={onClick}
      ref={ref}
    >
      <i className="fas fa-calendar mr-1"></i> Tháng {value}
    </button>
  ));
  const handleGetDataByDate = (date) => {
    let params = {
      month: moment(date).month() + 1,
      year: moment(date).year(),
    };
    let previousParams = {};
    if (moment(date).month() > 0) {
      previousParams = {
        month: moment(date).month(),
        year: moment(date).year(),
      };
    } else {
      previousParams = {
        month: 12,
        year: moment(date).year() - 1,
      };
    }
    //current
    OrderService.getOrderByDate(params)
      .then((res) => {
        let listOrder = res.data;
        setTotalOrder(res.data.length);
        setTotalSales(
          listOrder.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setDate(date);
      })
      .then(() => {
        UserService.getUserByDate(params).then((res) => {
          setTotalUser(res.data.length);
        });
      })
      .then(() => {
        ShopService.getShopByDate(params).then((res) => {
          setTotalShop(res.data.length);
        });
      });

    OrderService.getOrderByDate(previousParams)
      .then((res) => {
        let listOrder = res.data;
        setPreviousTotalOrder(res.data.length);
        setPreviousTotalSales(
          listOrder.reduce((sum, item) => sum + item.totalPrice, 0)
        );
        setDate(date);
      })
      .then(() => {
        UserService.getUserByDate(previousParams).then((res) => {
          setPreviousTotalUser(res.data.length);
        });
      })
      .then(() => {
        ShopService.getShopByDate(previousParams).then((res) => {
          setPreviousTotalShop(res.data.length);
        });
      });

    //previous
  };
  const renderPercent = (valueCurrent, valuePrevious) => {
    let { percent, isHigher } = getPercent(valueCurrent, valuePrevious);
    if (isHigher !== null) {
      if (isHigher) {
        return (
          <span>
            {percent != 0 && <span>{percent}%</span>}
            <i className="mdi mdi-arrow-up text-success"></i>
          </span>
        );
      } else {
        return (
          <span>
            {percent != 0 && <span>{percent}%</span>}
            <i className="mdi mdi-arrow-down text-danger"></i>
          </span>
        );
      }
    }
  };
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-end">
        <div>
          <DatePicker
            selected={date}
            onChange={(date) => handleGetDataByDate(date)}
            customInput={<CustomInputMonth />}
            dateFormat="MM/yyyy"
            picker="month"
            showMonthYearPicker
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-primary float-right">
                  Tháng {moment(date).month() + 1}
                </span>
                <h5 className="card-title mb-0">Doanh số bán hàng</h5>
              </div>
              <div className="row d-flex align-items-center mb-3">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {formatVND(totalSales)}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span> {renderPercent(totalSales, previousTotalSales)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-primary float-right">
                  Tháng {moment(date).month() + 1}
                </span>
                <h5 className="card-title mb-0">Tổng đơn hàng</h5>
              </div>
              <div className="row d-flex align-items-center mb-3">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {totalOrder}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-muted">
                    {renderPercent(totalOrder, previousTotalOrder)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-primary float-right">
                  Tháng {moment(date).month() + 1}
                </span>
                <h5 className="card-title mb-0">Người bán mới</h5>
              </div>
              <div className="row d-flex align-items-center mb-3">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {totalShop}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-muted">
                    {renderPercent(totalShop, previousTotalShop)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-primary float-right">
                  Tháng {moment(date).month() + 1}
                </span>
                <h5 className="card-title mb-0">Khách hàng mới</h5>
              </div>
              <div className="row d-flex align-items-center mb-3">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">
                    {totalUser}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-muted">
                    {renderPercent(totalUser, previousTotalUser)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChartCardTotal;
