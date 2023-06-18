import instance from "../axios";
const getOrderById = async (id) => {
  return await instance.get("/order/" + id);
};
const getOrderByDate = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/order-statistic", config);
};
const getOrderByUserId = async (userId) => {
  return await instance.get("/order/user/" + userId);
};
const getOrderByShopId = async (shopId) => {
  return await instance.get("/order/shop/" + shopId);
};
const updateOrder = async (id, status) => {
  return await instance.put("/order/" + id, { status: status });
};
const OrderService = {
  getOrderById,
  getOrderByDate,
  getOrderByUserId,
  getOrderByShopId,
  updateOrder,
};
export default OrderService;
