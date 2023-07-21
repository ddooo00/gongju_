import { styled } from "styled-components";

export const Container = styled.div`
  background-color: #1b2638;
`;

export const DetailContainer = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  background-color: #1b2638;
  color: white;
  text-align: center;
`;

export const BackBtn = styled.button`
  float: left;
  margin-left: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

export const DetailTitle = styled.div`
  padding-top: 100px;
  font-size: 40px;
`;

export const DetailDescription = styled.li`
  width: 80%;
  margin: 0 auto 30px auto;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
`;

export const DetailAddress = styled.li`
  font-size: 20px;
  margin-top: 20px;
`;

export const DetailLink = styled.a`
  color: white;
`;

export const DetailHompage = styled.li`
  padding: 20px;
  font-size: 20px;
  color: white;
`;

export const Line = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
`;
