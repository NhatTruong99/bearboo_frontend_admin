export const loginSuccess = (admin) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: admin,
  };
};
export const updateAdmin = (admin) => {
  return {
    type: "UPDATE_SHOP",
    payload: admin,
  };
};
export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
export const setSideBarIndex = (index) => {
  return {
    type: "SET_SIDEBAR_INDEX",
    payload: index,
  };
};
