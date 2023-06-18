import instance from "../axios";

const getAllUser = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/user", config);
};
const getUserById = async (userId) => {
  return await instance.get("/user/" + userId);
};
const getUserByDate = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/user-statistic", config);
};
const searchUser = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/search-user", config);
};
const UserService = {
  getAllUser,
  getUserById,
  getUserByDate,
  searchUser,
};

export default UserService;
