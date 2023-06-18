import instance from "../axios";

const getAllShop = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/shop", config);
};

const getShopById = async (id) => {
  return await instance.get("/shop/" + id);
};
const getShopByDate = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/shop-statistic", config);
};
const createShop = async (shop) => {
  return await instance.post("/shop", shop);
};
const updateShop = async (id, data) => {
  return await instance.put("/shop/" + id, data);
};
const searchShop = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/search-shop", config);
};
const ShopService = {
  getAllShop,
  getShopById,
  getShopByDate,
  createShop,
  updateShop,
  searchShop,
};

export default ShopService;
