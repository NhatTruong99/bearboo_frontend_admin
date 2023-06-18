import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./auth.css";
import AuthService from "../../services/authService";
import Validation from "../../utils/validation";
import { loginSuccess } from "../../actions/admin";
function Login() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [messageLogin, setMessageLogin] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && email != "" && password != "") {
      const data = AuthService.login(email, password).then((data) => {
        if (data && data.errorCode != 0) {
          setMessageLogin(data.message);
        } else {
          let action = loginSuccess(data.user);
          dispatch(action);
          navigate("/");
        }
      });
      toast.promise(data, {
        pending: "Đang đăng nhập tài khoản...",
      });
    } else {
      setMessageLogin();
    }
  }, [errors]);

  const submitForm = () => {
    let shop = {
      email,
      password,
    };
    setErrors(Validation.validationLogin(shop));
  };

  const handleShowPassword = () => {
    setIsPasswordType(!isPasswordType);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center min-vh-100">
            <div className="w-100 d-block bg-white shadow-lg rounded my-5">
              <div className="row">
                <ToastContainer autoClose={3000} />
                <div className="col-lg-5 d-none d-lg-block bg-login rounded-left"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center mb-5">
                      <a
                        href="index.html"
                        className="text-dark font-size-22 font-family-secondary"
                      >
                        <i className="mdi mdi-alpha-x-circle"></i>{" "}
                        <b>BEARBOO - Trang quản trị</b>
                      </a>
                    </div>
                    <h1 className="h3 mb-2 font-family-third text-center">
                      Đăng nhập{" "}
                    </h1>
                    <div className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <p className="mess-error">{errors.email}</p>
                        )}
                      </div>
                      <div className="form-group input-password">
                        <input
                          className="form-control form-control-user "
                          placeholder="Mật khẩu"
                          type={isPasswordType ? "password" : "text"}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <p className="mess-error">{errors.password}</p>
                        )}
                        <span className="icon-eye" onClick={handleShowPassword}>
                          <i
                            className={
                              isPasswordType ? "mdi mdi-eye" : "mdi mdi-eye-off"
                            }
                          ></i>
                        </span>
                      </div>
                      <span className=" errMess">{messageLogin}</span>
                      <button
                        onClick={submitForm}
                        className="btn btn-success btn-block waves-effect waves-light "
                      >
                        {" "}
                        ĐĂNG NHẬP{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
