import instance from "../axios";

const getAllCategory = async () => {
  return await instance.get("/category");
};

const getCategoryById = async (id) => {
  return await instance.get("/category/" + id);
};

const getCategoryByParentId = async (parentId) => {
  return await instance.get("/category/parent/" + parentId);
};
const CategoryService = {
  getAllCategory,
  getCategoryById,
  getCategoryByParentId,
};

export default CategoryService;
