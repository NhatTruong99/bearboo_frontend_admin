import "./headerClient.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthService from "../../services/authService";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../Notification/Notification";
function HeaderClient() {
  const currentAdmin = useSelector((state) => state.admin.adminInfo);
  const sideBarIndex = useSelector((state) => state.admin.sideBarIndex);
  useEffect(() => {
    document.title = "BearBoo";
  }, []);
  return (
    <div id="layout-wrapper">
      <div className="header-border"></div>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-left">
            <button
              type="button"
              className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className="d-flex align-items-center">
            {currentAdmin && <Notification />}

            {currentAdmin && (
              <div className="dropdown d-inline-block ml-2">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="rounded-circle header-profile-user"
                    src={currentAdmin.avatar}
                    style={{ objectFit: "cover" }}
                    alt="Header Avatar"
                  />
                  <span className="d-none d-sm-inline-block ml-1">
                    {currentAdmin.accountName}
                  </span>

                  <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link
                    to="/logout"
                    className="dropdown-item d-flex align-items-center justify-content-between"
                  >
                    <span>Đăng xuất</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* <!-- ========== Left Sidebar Start ========== --> */}
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <div className="navbar-brand-box">
            <img
              src="/admin/images/media/logo_bearboo_png.png"
              alt=""
              className="header__logo-img"
            />
          </div>

          {/* <!--- Sidemenu --> */}
          <div id="sidebar-menu">
            {/* <!-- Left Menu Start --> */}
            <ul className="metismenu list-unstyled" id="side-menu">
              {/* <li>
                <a href="" className="has-arrow waves-effect">
                  <i className="mdi mdi-format-page-break"></i>
                  <span>Pages</span>
                </a>
              </li> */}

              {!currentAdmin && (
                <>
                  <li>
                    <Link className=" waves-effect" to="/login">
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Đăng nhập</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className=" waves-effect">
                      <i className="fas fa-user-check"></i>
                      <span>Đăng ký</span>
                    </Link>
                  </li>
                </>
              )}
              {currentAdmin && (
                <>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 1
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/"
                    >
                      <i className="fas fa-home"></i>
                      <span>Trang chủ </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 2
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/shop"
                    >
                      <i className="fas fa-paste"></i>
                      <span>Quản lý người bán </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 3
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/user"
                    >
                      <i className="fas fa-file-invoice"></i>
                      <span>Quản lý người dùng </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 4
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/product"
                    >
                      <i className="fas fa-store"></i>
                      <span>Quản lý sản phẩm</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 5
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/order-statistic"
                    >
                      <i className="fas fa-chart-bar"></i>
                      <span>Thống kê doanh thu</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 6
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/user-statistic"
                    >
                      <i className="fas fa-chart-bar"></i>
                      <span>Thống kê người dùng</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        sideBarIndex == 7
                          ? " waves-effect sidebar-menu-active"
                          : " waves-effect "
                      }
                      to="/report"
                    >
                      <i className="far fa-flag"></i>
                      <span>Danh sách báo cáo</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/logout">
                      <i className="fas fa-sign-out-alt"></i>
                      <span> Đăng xuất</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* <!-- Sidebar --> */}
        </div>
      </div>
      {/* <!-- Left Sidebar End --> */}
      {/* 
            <!-- ============================================================== -->
            <!-- Start right Content here -->
            <!-- ============================================================== --> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">2020 © Xeloro.</div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Design & Develop by Myra
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HeaderClient;
