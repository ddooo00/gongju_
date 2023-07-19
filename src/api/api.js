import api from "../axios/api";

// axios 요청이 들어가는 모든 모듈

// 조회

const getFestivals = async () => {
  const response = await api.get(`/festivals`);
  return response.data;
};

const getCampsites = async () => {
  const response = await api.get(`/campsites`);
  return response.data;
};

const getHeritages = async () => {
  const response = await api.get(`/heritages`);
  return response.data;
};

const getRestaurants = async () => {
  const response = await api.get(`/restaurants`);
  return response.data;
};

const getMountains = async () => {
  const response = await api.get(`/mountains`);
  return response.data;
};

const getChart = async () => {
  const response = await api.get(`/chart`);
  return response.data;
};

const updateChart = async ({ id, updatedChart }) => {
  await api.patch(`/chart/${id}`, updatedChart);
};

export {
  getFestivals,
  getCampsites,
  getRestaurants,
  getHeritages,
  getMountains,
  getChart,
  updateChart,
};
