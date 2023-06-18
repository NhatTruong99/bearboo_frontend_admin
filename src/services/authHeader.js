import TokenService from "./tokenService";

export default function authHeader() {
  const accessToken = TokenService.getLocalAccessToken();
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
