import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import "./chart.css";
import LineChart from "./LineChart";
import ChartCardTotal from "./ChartCardTotal";
import { isObjectEmpty, months } from "../../utils/helper";
import OrderService from "../../services/orderService";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSideBarIndex } from "../../actions/admin";
function Dashboard() {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [orderDataChart, setOrderDataChart] = useState({});
  const [saleDataChart, setSaleDataChart] = useState({});
  useEffect(() => {
    let action = setSideBarIndex(1);
    dispatch(action);
    for (let i = 1; i < 13; i++) {
      OrderService.getOrderByDate({
        month: i,
        year: moment(new Date()).year(),
      }).then((res) => {
        let dataOrder = {
          month: i,
          quantity: res.data.length,
        };
        let dataSale = {
          month: i,
          quantity: res.data.reduce((sum, item) => sum + item.totalPrice, 0),
        };
        setOrderData((list) => [...list, dataOrder]);
        setSaleData((list) => [...list, dataSale]);
      });
    }
  }, []);
  useEffect(() => {
    if (orderData.length > 0) {
      setOrderDataChart({
        labels: orderData
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Số lượng đơn hàng",
            data: orderData.map((data) => data.quantity),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [orderData]);
  useEffect(() => {
    if (saleData.length > 0) {
      setSaleDataChart({
        labels: saleData
          .sort(function (a, b) {
            return a.month - b.month;
          })
          .map((data) => `Tháng ${data.month}`),
        datasets: [
          {
            label: "Doanh thu",
            data: saleData.map((data) => data.quantity),
            fill: false,
            borderColor: "#5672c7",
            tension: 0.3,
          },
        ],
      });
    }
  }, [saleData]);
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
  return (
    <div className="row dashboard">
      <div className="col-12">
        <div className="card-body text-left p-4">
          <ChartCardTotal />
        </div>
        <div className="card chart-card ">
          <div className="card-body text-left">
            <h5 className=" text-left">Thống kê đơn hàng</h5>
            <hr />
            <div className="d-flex justify-content-center">
              {!isObjectEmpty(orderDataChart) && (
                <div className="text-center">
                  <p className="title-chart">Số lượng đơn hàng</p>
                  <LineChart options={optionsSale} chartData={orderDataChart} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card chart-card mt-5 ">
          <div className="card-body text-left">
            <h5 className="text-left">Thống kê doanh thu</h5>
            <hr />
            <div className="d-flex justify-content-center">
              {!isObjectEmpty(saleDataChart) && (
                <div className="text-center">
                  <p className="title-chart">Doanh số bán hàng</p>
                  <LineChart options={optionsSale} chartData={saleDataChart} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
