import instance from "../axios";
import authHeader from "./authHeader";
import TokenService from "./tokenService";

const login = async (email, password) => {
  return await instance
    .post("/auth/admin/login", { email: email, password: password })
    .then((response) => {
      if (Object.keys(response.data.accessToken).length != 0) {
        TokenService.setLocalAccessToken(response.data.accessToken);
      }
      if (Object.keys(response.data.refreshToken).length != 0) {
        TokenService.setLocalRefreshToken(response.data.refreshToken);
      }
      return response.data;
    });
};

const logout = async (admin) => {
  TokenService.removeLocalAccessToken();
  TokenService.removeLocalRefreshToken();
  return await instance.delete("/auth/admin/logout", {
    data: { email: admin.email },
  });
};

const AuthService = {
  login,
  logout,
};
export default AuthService;
