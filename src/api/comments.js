import api from "../axios/api";

// comments에 들어가는 api 모듈

// 댓글 조회
const getComments = async () => {
  const response = await api.get(`/comments`);
  return response.data;
};

// 댓글 추가
const addComment = async (newComment) => {
  await api.post(`/comments`, newComment);
};

// 댓글 삭제
const deleteComment = async (id) => {
  await api.delete(`/comments/${id}`);
};

// 댓글 수정
const updateComment = async (updatecomment) => {
  await api.patch(`/comments/${updatecomment.id}`, updatecomment);
};

export { getComments, addComment, deleteComment, updateComment };
