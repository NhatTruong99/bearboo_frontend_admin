import instance from "../axios";
import authHeader from "./authHeader";

const getAllProduct = async (params) => {
  let config = {
    headers: authHeader(),
    params: params,
  };
  return await instance.get("/product", config);
};
const createProduct = async (product) => {
  return await instance.post("/product", product, { headers: authHeader() });
};
const getProductById = async (id) => {
  return await instance.get("/product/" + id);
};
const getProductByShopId = async (id, params) => {
  let config = {
    params: params,
  };
  return await instance.get("/product/shop/" + id, config);
};
const updateProduct = async (id, data) => {
  return await instance.put("/product/" + id, data);
};
const createProductDescription = async (desc) => {
  return await instance.post("/product/desc", desc);
};
//=============================SKU==============================
const getProductSKUById = async (id) => {
  return await instance.get("/product-sku/" + id);
};
const getProductSKUByProductId = async (id, params) => {
  let config = {
    params: params,
  };
  return await instance.get("/product-sku/product/" + id, config);
};
const createProductSKU = async (productSKU) => {
  return await instance.post("/product-sku", productSKU);
};
const updateProductSKU = async (id, data) => {
  return await instance.put("/product-sku/" + id, data);
};
//=============================SEARCH==============================
const searchProduct = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/search", config);
};
const ProductService = {
  getAllProduct,
  getProductById,
  getProductByShopId,
  createProduct,
  updateProduct,
  getProductSKUById,
  getProductSKUByProductId,
  createProductSKU,
  updateProductSKU,
  createProductDescription,
  searchProduct,
};

export default ProductService;
