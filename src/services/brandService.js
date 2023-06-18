import instance from "../axios";

const getAllBrand = async () => {
  return await instance.get("/brand");
};

const getBrandById = async (id) => {
  return await instance.get("/brand/" + id);
};

const getBrandByShopId = async (shopId) => {
  return await instance.get("/brand/shop/" + shopId);
};

const createBrand = async (Brand) => {
  return await instance.post("/brand", Brand);
};
const BrandService = {
  getAllBrand,
  getBrandById,
  getBrandByShopId,
  createBrand,
};

export default BrandService;
