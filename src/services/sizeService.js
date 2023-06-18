import instance from "../axios";

const getAllSize = async () => {
  return await instance.get("/size");
};

const getSizeById = async (id) => {
  return await instance.get("/size/" + id);
};

const getSizeByShopId = async (shopId) => {
  return await instance.get("/size/shop/" + shopId);
};

const createSize = async (size) => {
  return await instance.post("/size", size);
};
const SizeService = {
  getAllSize,
  getSizeById,
  getSizeByShopId,
  createSize,
};

export default SizeService;
