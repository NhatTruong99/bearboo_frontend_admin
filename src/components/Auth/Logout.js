import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { logoutSuccess } from "../../actions/admin";
import { useDispatch, useSelector } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentAdmin = useSelector((state) => state.admin.adminInfo);
  useEffect(() => {
    AuthService.logout(currentAdmin).then((res) => {
      const action = logoutSuccess();
      dispatch(action);
      alert("Đăng xuất thành công!");
      navigate("/");
      window.location.reload();
    });
  }, []);
}
export default Logout;
