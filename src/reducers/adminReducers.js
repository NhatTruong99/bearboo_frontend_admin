const initialState = {
  adminInfo: null,
  isLoggedIn: false,
  sideBarIndex: 1,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.payload,
      };
    }
    case "UPDATE_ADMIN": {
      return {
        ...state,
        adminInfo: action.payload,
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    }
    case "SET_SIDEBAR_INDEX": {
      return {
        ...state,
        sideBarIndex: action.payload,
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
