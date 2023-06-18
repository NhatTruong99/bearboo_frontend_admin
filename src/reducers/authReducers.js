const initialState = {
  emailVerify: "123",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMAIL_CHECK_VERIFY": {
      return {
        ...state,
        emailVerify: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
