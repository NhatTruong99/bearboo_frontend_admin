import axios from "axios";

const ADDRESS_URL = "https://provinces.open-api.vn/api";

const getAllProvince = async () => {
  return await axios.get(ADDRESS_URL + "/p");
};
const getDistrictByIdProvince = async (id) => {
  return await axios.get(`${ADDRESS_URL}/p/${id}?depth=2`);
};
const getWardByIdDistrict = async (id) => {
  return await axios.get(`${ADDRESS_URL}/d/${id}?depth=2`);
};
const AddressService = {
  getAllProvince: getAllProvince,
  getDistrictByIdProvince,
  getWardByIdDistrict,
};
export default AddressService;
