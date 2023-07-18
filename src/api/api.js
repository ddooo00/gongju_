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

const getComments = async () => {
  const response = await api.get(`/comments`);
  return response.data;
};

const addComment = async (newComment) => {
  await api.post(`/comments`, newComment);
};

const deleteComment = async (id) => {
  await api.delete(`/comments/${id}`);
};

const updateComment = async (updatecomment) => {
  await api.patch(`/comments/${updatecomment.id}`, updatecomment);
};

export { getComments, addComment, deleteComment, updateComment,  getFestivals, getCampsites, getRestaurants, getHeritages, getMountains};
