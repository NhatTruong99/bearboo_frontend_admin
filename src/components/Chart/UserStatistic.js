import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSideBarIndex } from "../../actions/admin";
import UserService from "../../services/userService";
import LineChart from "./LineChart";
import { formatVND, getMonthDays, isObjectEmpty } from "../../utils/helper";
import moment from "moment";
import BarChart from "./BarChart";
import DatePicker from "react-datepicker";
import ShopService from "../../services/shopService";
function UserStatistic() {
  const dispatch = useDispatch();
  //YEAR
  const [dateYear, setDateYear] = useState(new Date());
  const [userDataYear, setUserDataYear] = useState([]);
  const [shopDataYear, setShopDataYear] = useState([]);
  const [userDataChartYear, setUserDataChartYear] = useState({});
  const [shopDataChartYear, setShopDataChartYear] = useState({});
  //MONTH
  const [dateMonth, setDateMonth] = useState(new Date());
  const [userDataMonth, setUserDataMonth] = useState([]);
  const [shopDataMonth, setShopDataMonth] = useState([]);
  const [userDataChartMonth, setUserDataChartMonth] = useState({});
  const [shopDataChartMonth, setShopDataChartMonth] = useState({});
  //DAY
  const [date, setDate] = useState(new Date());
  const [userDataDay, setUserDataDay] = useState(0);
  const [shopDataDay, setShopDataDay] = useState(0);

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
    let action = setSideBarIndex(6);
    dispatch(action);
    handleGetDataYear(new Date());
    handleGetDataMonth(new Date());
    handleGetDataDay(new Date());
  }, []);
  //YEAR
  const handleGetDataYear = (date) => {
    setDateYear(date);
    setUserDataYear([]);
    setShopDataYear([]);
    for (let i = 1; i < 13; i++) {
      UserService.getUserByDate({
        month: i,
        year: moment(date).year(),
      })
        .then((res) => {
          let dataUser = {
            month: i,
            quantity: res.data.length,
          };
          setUserDataYear((list) => [...list, dataUser]);
        })
        .then(() => {
          ShopService.getShopByDate({
            month: i,
            year: moment(date).year(),
          }).then((res) => {
            let dataShop = {
              month: i,
              quantity: res.data.length,
            };
            setShopDataYear((list) => [...list, dataShop]);
          });
        });
    }
  };
  useEffect(() => {
    if (userDataYear.length > 0) {
      setUserDataChartYear({
        labels: userDataYear
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Khách hàng mới",
            data: userDataYear.map((data) => data.quantity),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
    if (shopDataYear.length > 0) {
      setShopDataChartYear({
        labels: shopDataYear
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Người bán mới",
            data: shopDataYear.map((data) => data.quantity),
            fill: false,
            backgroundColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [shopDataYear]);

  //MONTH
  const handleGetDataMonth = (date) => {
    setDateMonth(date);
    setUserDataMonth([]);
    setShopDataMonth([]);
    let numberDay = getMonthDays(moment(date).month() + 1, moment(date).year());
    for (let i = 1; i <= numberDay; i++) {
      UserService.getUserByDate({
        day: i,
        month: moment(date).month() + 1,
        year: moment(date).year(),
      })
        .then((res) => {
          let dataUser = {
            day: i,
            quantity: res.data.length,
          };
          setUserDataMonth((list) => [...list, dataUser]);
        })
        .then(() => {
          ShopService.getShopByDate({
            day: i,
            month: moment(date).month() + 1,
            year: moment(date).year(),
          }).then((res) => {
            let dataShop = {
              day: i,
              quantity: res.data.length,
            };
            setShopDataMonth((list) => [...list, dataShop]);
          });
        });
    }
  };

  useEffect(() => {
    if (userDataMonth.length > 0) {
      setUserDataChartMonth({
        labels: userDataMonth
          .sort(function (a, b) {
            return a.day - b.day;
          })
          .map((data) => `${data.day}`),
        datasets: [
          {
            label: "Số lượng khách hàng",
            data: userDataMonth.map((data) => data.quantity),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
      setShopDataChartMonth({
        labels: shopDataMonth
          .sort(function (a, b) {
            return a.day - b.day;
          })
          .map((data) => `${data.day}`),
        datasets: [
          {
            label: "Số lượng người bán",
            data: shopDataMonth.map((data) => data.quantity),
            fill: false,
            backgroundColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [shopDataMonth]);

  //DAY
  const handleGetDataDay = (date) => {
    setDate(date);
    UserService.getUserByDate({
      day: moment(date).date(),
      month: moment(date).month() + 1,
      year: moment(date).year(),
    })
      .then((res) => {
        setUserDataDay(res.data.length);
      })
      .then(() => {
        ShopService.getShopByDate({
          day: moment(date).date(),
          month: moment(date).month() + 1,
          year: moment(date).year(),
        }).then((res) => {
          setShopDataDay(res.data.length);
        });
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
                    <h5 className="card-title mb-0">Khách hàng mới</h5>
                  </div>
                  <div className="row d-flex align-items-center mb-3">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        {userDataDay}
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
                    <h5 className="card-title mb-0">Người bán mới</h5>
                  </div>
                  <div className="row d-flex align-items-center mb-3">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        {shopDataDay}
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

          {!isObjectEmpty(userDataChartMonth) && (
            <div style={{ margin: "10px 150px" }}>
              <div className="text-center">
                <p className="title-chart">Số lượng khách hàng</p>
                <LineChart
                  options={optionsSale}
                  chartData={userDataChartMonth}
                />
              </div>
            </div>
          )}
          <hr />
          {!isObjectEmpty(shopDataChartMonth) && (
            <div style={{ margin: "20px 150px" }}>
              <div className="text-center">
                <p className="title-chart">Số lượng người bán</p>{" "}
                <BarChart
                  options={optionsQuantity}
                  chartData={shopDataChartMonth}
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
          <div className="row">
            {!isObjectEmpty(userDataChartYear) && (
              <div className="col-6">
                <div className="text-center">
                  <p className="title-chart">Số lượng khách hàng</p>
                  <LineChart
                    options={optionsSale}
                    chartData={userDataChartYear}
                  />
                </div>{" "}
              </div>
            )}
            {!isObjectEmpty(shopDataChartYear) && (
              <div className="col-6">
                <div className="text-center">
                  <p className="title-chart">Số lượng người bán</p>{" "}
                  <BarChart
                    options={optionsQuantity}
                    chartData={shopDataChartYear}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserStatistic;
