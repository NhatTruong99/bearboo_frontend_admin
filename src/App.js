import logo from "./logo.svg";
import HeaderClient from "./components/Header/headerClient";
import { Routes, Route, Outlet } from "react-router-dom";
import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Chart/Dashboard";
import ProtectedRoute from "./utils/protectRouter";
import OrderStatistic from "./components/Chart/OrderStatistic";
import UserStatistic from "./components/Chart/UserStatistic";
import ListProduct from "./components/Block/ListProduct";
import ListShop from "./components/Block/ListShop";
import ListUser from "./components/Block/ListUser";
import Report from "./components/Report/Report";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<HeaderClient />} />
        <Route element={<HeaderClient />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <ListProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <ListShop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <ListUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-statistic"
            element={
              <ProtectedRoute>
                <OrderStatistic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-statistic"
            element={
              <ProtectedRoute>
                <UserStatistic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
