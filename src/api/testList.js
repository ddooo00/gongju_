import api from "../axios/api";

//test, result에 들어가는 api 모듈

//테스트 질문, 응답 리스트 조회
const getList = async () => {
  const response = await api.get("/gongjuList");
  return response.data;
};

//테스트 결과 조회
const getResult = async () => {
  const response = await api.get("/gongjuTypeData");
  return response.data;
};

export { getList, getResult };
