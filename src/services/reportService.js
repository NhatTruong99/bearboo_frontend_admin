import instance from "../axios";

const getAllReport = async (params) => {
  let config = {
    params: params,
  };
  return await instance.get("/report", config);
};

const getReportById = async (id) => {
  return await instance.get("/report/" + id);
};

const createReport = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await instance.post("/report", data);
};

const getReportCondition = async (data) => {
  const config = {
    params: data,
  };
  return await instance.get("/report-condition", config);
};

const checkReadReport = async (id) => {
  return await instance.post("/report/check-readed/" + id);
};

const ReportService = {
  getAllReport,
  getReportById,
  createReport,
  getReportCondition,
};

export default ReportService;
