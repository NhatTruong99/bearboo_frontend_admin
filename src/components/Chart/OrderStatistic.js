import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSideBarIndex } from "../../actions/admin";
import OrderService from "../../services/orderService";
import LineChart from "./LineChart";
import { formatVND, getMonthDays, isObjectEmpty } from "../../utils/helper";
import moment from "moment";
import BarChart from "./BarChart";
import DatePicker from "react-datepicker";
function OrderStatistic() {
  const dispatch = useDispatch();
  //YEAR
  const [dateYear, setDateYear] = useState(new Date());
  const [orderDataYear, setOrderDataYear] = useState([]);
  const [orderQuantityDataChartYear, setOrderQuantityDataChartYear] = useState(
    {}
  );
  const [orderSaleDataChartYear, setOrderSaleDataChartYear] = useState({});
  //MONTH
  const [dateMonth, setDateMonth] = useState(new Date());
  const [orderDataMonth, setOrderDataMonth] = useState([]);
  const [orderSaleDataChartMonth, setOrderSaleDataChartMonth] = useState({});
  const [orderQuantityDataChartMonth, setOrderQuantityDataChartMonth] =
    useState({});
  //DAY
  const [date, setDate] = useState(new Date());
  const [orderSaleDay, setOrderSaleDay] = useState(0);
  const [orderQuantityDay, setOrderQuantityDay] = useState(0);
  const [orderProductQuantityDay, setOrderProductQuantityDay] = useState(0);
  const CustomInputDay = forwardRef(({ value, onClick }, ref) => (
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
  const CustomInputYear = forwardRef(({ value, onClick }, ref) => (
    <button
      className="custom-date-input btn btn-primary"
      onClick={onClick}
      ref={ref}
    >
      <i className="fas fa-calendar mr-1"></i> Năm {value}
    </button>
  ));

  useEffect(() => {
    let action = setSideBarIndex(5);
    dispatch(action);
    handleGetDataYear(new Date());
    handleGetDataMonth(new Date());
    handleGetDataDay(new Date());
  }, []);
  //YEAR
  const handleGetDataYear = (date) => {
    setDateYear(date);
    setOrderDataYear([]);
    for (let i = 1; i < 13; i++) {
      OrderService.getOrderByDate({
        month: i,
        year: moment(date).year(),
      }).then((res) => {
        let dataOrder = {
          month: i,
          quantity: res.data.length,
          totalPrice: res.data.reduce((sum, item) => sum + item.totalPrice, 0),
        };
        setOrderDataYear((list) => [...list, dataOrder]);
      });
    }
  };
  useEffect(() => {
    if (orderDataYear.length > 0) {
      setOrderSaleDataChartYear({
        labels: orderDataYear
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Tổng doanh thu",
            data: orderDataYear.map((data) => data.totalPrice),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
      setOrderQuantityDataChartYear({
        labels: orderDataYear
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Tổng số đơn hàng",
            data: orderDataYear.map((data) => data.quantity),
            fill: false,
            backgroundColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [orderDataYear]);

  //MONTH
  const handleGetDataMonth = (date) => {
    setDateMonth(date);
    setOrderDataMonth([]);
    let numberDay = getMonthDays(moment(date).month() + 1, moment(date).year());
    for (let i = 1; i <= numberDay; i++) {
      OrderService.getOrderByDate({
        day: i,
        month: moment(date).month() + 1,
        year: moment(date).year(),
      }).then((res) => {
        let dataOrder = {
          day: i,
          quantity: res.data.length,
          totalPrice: res.data.reduce((sum, item) => sum + item.totalPrice, 0),
        };
        setOrderDataMonth((list) => [...list, dataOrder]);
      });
    }
  };

  useEffect(() => {
    if (orderDataMonth.length > 0) {
      setOrderSaleDataChartMonth({
        labels: orderDataMonth
          .sort(function (a, b) {
            return a.day - b.day;
          })
          .map((data) => `${data.day}`),
        datasets: [
          {
            label: "Tổng doanh thu",
            data: orderDataMonth.map((data) => data.totalPrice),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
      setOrderQuantityDataChartMonth({
        labels: orderDataMonth
          .sort(function (a, b) {
            return a.day - b.day;
          })
          .map((data) => `${data.day}`),
        datasets: [
          {
            label: "Tổng số đơn hàng",
            data: orderDataMonth.map((data) => data.quantity),
            fill: false,
            backgroundColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [orderDataMonth]);

  //DAY
  const handleGetDataDay = (date) => {
    setDate(date);
    console.log("date:", moment(date).date());
    OrderService.getOrderByDate({
      day: moment(date).date(),
      month: moment(date).month() + 1,
      year: moment(date).year(),
    }).then((res) => {
      setOrderProductQuantityDay(
        res.data.reduce((sum, item) => {
          let totalProduct = item.listOrderDetail.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          return sum + totalProduct;
        }, 0)
      );
      setOrderSaleDay(res.data.reduce((sum, item) => sum + item.totalPrice, 0));
      setOrderQuantityDay(res.data.length);
    });
  };
  const optionsSale = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Doanh thu đạt được",
        fontSize: 20,
      },
    },
  };
  const optionsQuantity = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Số lượng đơn hàng",
      },
    },
  };
  return (
    <div>
      <div className="card mt-3">
        <div className="card-body text-left">
          <div className="d-flex justify-content-between">
            <h5 className=" text-left">Thống kê theo ngày</h5>
            <div>
              <DatePicker
                selected={date}
                onChange={(date) => handleGetDataDay(date)}
                customInput={<CustomInputDay />}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-4">
            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="mb-4">
                    <span className="badge badge-soft-primary float-right">
                      {moment(date).format("DD/MM/yyyy")}
                    </span>
                    <h5 className="card-title mb-0">Doanh số bán hàng</h5>
                  </div>
                  <div className="row d-flex align-items-center mb-3">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        {formatVND(orderSaleDay)}
                      </h2>
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
                      {moment(date).format("DD/MM/yyyy")}
                    </span>
                    <h5 className="card-title mb-0">Tổng hóa đơn</h5>
                  </div>
                  <div className="row d-flex align-items-center mb-3">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        {orderQuantityDay}
                      </h2>
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
                      {moment(date).format("DD/MM/yyyy")}
                    </span>
                    <h5 className="card-title mb-0">Số lượng sản phẩm </h5>
                  </div>
                  <div className="row d-flex align-items-center mb-3">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        {orderProductQuantityDay}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body text-left">
          <div className="d-flex justify-content-between">
            <h5 className=" text-left">Thống kê theo tháng</h5>
            <div>
              <DatePicker
                selected={dateMonth}
                onChange={(date) => handleGetDataMonth(date)}
                customInput={<CustomInputMonth />}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </div>
          </div>
          <hr />

          {!isObjectEmpty(orderSaleDataChartMonth) && (
            <div style={{ margin: "10px 150px" }}>
              <div className="text-center">
                <p className="title-chart">Doanh thu bán hàng</p>
                <LineChart
                  options={optionsSale}
                  chartData={orderSaleDataChartMonth}
                />
              </div>
            </div>
          )}
          <hr />
          {!isObjectEmpty(orderQuantityDataChartMonth) && (
            <div style={{ margin: "20px 150px" }}>
              <div className="text-center">
                <p className="title-chart">Số lượng đơn hàng</p>
                <BarChart
                  options={optionsQuantity}
                  chartData={orderQuantityDataChartMonth}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body text-left">
          <div className="d-flex justify-content-between">
            <h5 className=" text-left">Thống kê theo năm</h5>
            <div>
              <DatePicker
                selected={dateYear}
                onChange={(date) => handleGetDataYear(date)}
                customInput={<CustomInputYear />}
                dateFormat="yyyy"
                showYearPicker
              />
            </div>
          </div>
          <hr />

          {!isObjectEmpty(orderSaleDataChartYear) && (
            <div className="row">
              <div className="col-6">
                <div className="text-center">
                  <p className="title-chart">Doanh thu bán hàng</p>
                  <LineChart
                    options={optionsSale}
                    chartData={orderSaleDataChartYear}
                  />
                </div>{" "}
              </div>
              <div className="col-6">
                <div className="text-center">
                  <p className="title-chart">Số lượng đơn hàng</p>
                  <BarChart
                    options={optionsQuantity}
                    chartData={orderQuantityDataChartYear}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default OrderStatistic;
