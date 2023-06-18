import instance from "../axios";

const blockProduct = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await instance.post("/block/product", data);
};
const blockUser = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await instance.post("/block/user", data);
};
const blockShop = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await instance.post("/block/shop", data);
};
const unBlockProduct = async (id) => {
  return await instance.post("/un-block/product", { id: id });
};
const unBlockUser = async (id) => {
  return await instance.post("/un-block/user", { id: id });
};
const unBlockShop = async (id) => {
  return await instance.post("/un-block/shop", { id: id });
};
const getReasonBlock = async (data) => {
  return await instance.post("/block/reason", data);
};
const BlockService = {
  blockProduct,
  blockUser,
  blockShop,
  unBlockProduct,
  unBlockUser,
  unBlockShop,
  getReasonBlock,
};

export default BlockService;
