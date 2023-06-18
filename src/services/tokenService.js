import instance from "../axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 365);

const handleRefreshToken = async (id, refreshToken) => {
  return await instance.post("/auth/user/refresh", {
    id: id,
    refreshToken: refreshToken,
  });
};

const getLocalAccessToken = () => {
  //return JSON.parse(localStorage.getItem("accessToken"));
  return cookies.get("access-token-admin");
};

const setLocalAccessToken = (accessToken) => {
  //localStorage.setItem("accessToken", JSON.stringify(accessToken));
  cookies.set("access-token-admin", accessToken, {
    path: "/",
    expires: expirationDate,
  });
};

const getLocalRefreshToken = () => {
  //return JSON.parse(localStorage.getItem("accessToken"));
  return cookies.get("refresh-token-admin");
};

const setLocalRefreshToken = (refreshToken) => {
  cookies.set("refresh-token-admin", refreshToken, {
    path: "/",
    expires: expirationDate,
  });
};

const removeLocalRefreshToken = () => {
  cookies.remove("refresh-token-admin", { path: "/" });
};
const removeLocalAccessToken = () => {
  cookies.remove("access-token-admin", { path: "/" });
};
const TokenService = {
  handleRefreshToken,

  getLocalAccessToken,
  setLocalAccessToken,
  removeLocalAccessToken,

  getLocalRefreshToken,
  setLocalRefreshToken,
  removeLocalRefreshToken,
};
export default TokenService;
