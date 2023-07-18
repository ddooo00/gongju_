import api from "../axios/api";

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

export { getComments, addComment, deleteComment, updateComment };
