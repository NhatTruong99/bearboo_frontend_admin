import instance from "../axios";

const getAllColor = async () => {
  return await instance.get("/color");
};

const getColorById = async (id) => {
  return await instance.get("/color/" + id);
};

const getColorByShopId = async (shopId) => {
  return await instance.get("/color/shop/" + shopId);
};
const createColor = async (color) => {
  return await instance.post("/color", color);
};
const ColorService = {
  getAllColor,
  getColorById,
  getColorByShopId,
  createColor,
};

export default ColorService;
