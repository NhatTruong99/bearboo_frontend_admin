export const authAddEmailCheckVerify = (email) => {
  return {
    type: "ADD_EMAIL_CHECK_VERIFY",
    payload: email,
  };
};
