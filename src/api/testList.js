import api from "../axios/api";

//axios 요청 들어가는 모듈 모음
const getList = async () => {
  const response = await api.get("/gongjuList");
  return response.data;
};

export { getList };
