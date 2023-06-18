const validationLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email không được để trống.";
  } else if (!isEmail(values.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!values.password) {
    errors.password = "Mật khẩu không được để trống.";
  }
  return errors;
};
const validationBlock = (values) => {
  let errors = {};
  if (!values.reason) {
    errors.reason = "Lý do không được để trống.";
  }
  return errors;
};
const validationSignup = (values) => {
  let errors = {};

  if (!values.accountName) {
    errors.accountName = "Tên tài khoản không được để trống.";
  } else if (values.accountName.length < 6) {
    errors.accountName = "Tên tài khoản phải ít nhất 6 ký tự.";
  }
  if (!values.fullName) {
    errors.fullName = "Họ tên không được để trống.";
  }
  if (!values.email) {
    errors.email = "Email không được để trống.";
  } else if (!isEmail(values.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!values.password) {
    errors.password = "Mật khẩu không được để trống.";
  } else if (values.password.length < 8) {
    errors.password = "Mật khẩu phải ít nhất 8 ký tự.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Nhập lại mật khẩu không được để trống.";
  } else if (values.confirmPassword != values.password) {
    errors.confirmPassword = "Nhập lại mật khẩu không chính xác.";
  }
  return errors;
};
const validationUser = (values) => {
  let errors = {};
  if (!values.accountName) {
    errors.accountName = "Tên tài khoản không được để trống.";
  } else if (values.accountName.length < 6) {
    errors.accountName = "Tên tài khoản phải ít nhất 6 ký tự.";
  }
  if (!values.fullName) {
    errors.fullName = "Họ tên không được để trống.";
  }
  if (values.isChangeImage) {
    if (!values.imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      errors.avatar = "Định dạng file không hợp lệ.";
    }
  }
  return errors;
};
const validationAddress = (values) => {
  let errors = {};
  if (!values.userName) {
    errors.userName = "Họ tên không được để trống.";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Số điện thoại không được để trống.";
  } else if (!isPhoneNumber(values.phoneNumber)) {
    errors.phoneNumber = "Số điện thoại không hợp lệ.";
  }
  if (!values.address) {
    errors.address = "Địa chỉ không được để trống.";
  }
  return errors;
};
const validationForgotPassword = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email không được để trống.";
  }
  return errors;
};
const validationChangePassword = (values) => {
  let errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = "Mật khẩu hiện tại không được để trống.";
  }
  if (!values.newPassword) {
    errors.newPassword = "Mật khẩu mới không được để trống.";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Mật khẩu phải ít nhất 8 ký tự.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Nhập lại mật khẩu không được để trống.";
  } else if (values.confirmPassword != values.newPassword) {
    errors.confirmPassword = "Nhập lại mật khẩu không chính xác.";
  }
  return errors;
};
const validationReview = (values) => {
  let errors = {};
  if (values.imageFile) {
    if (!values.imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      errors.image = "Đã xóa ảnh có định dạng file không hợp lệ.";
    }
  }

  return errors;
};
const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isPhoneNumber = (phoneNumber) => {
  return String(phoneNumber).match(/^(84|0[3|5|7|8|9])+([0-9]{8})$/);
};

const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

const Validation = {
  validationSignup,
  validationLogin,
  validationUser,
  validationAddress,
  validationForgotPassword,
  validationChangePassword,
  validationReview,
  validationBlock,
};
export default Validation;
