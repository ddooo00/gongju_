import { styled } from "styled-components";

export const MainContainer = styled.div`
  background-color: #dce6ef;
`;

export const MainWrapper = styled.div`
  max-width: 1200px;
  min-width: 800px;
  /* height: 800px; */
  margin: 0 auto;
`;

export const LogoutBtnBox = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  padding: 20px 20px;
`;

export const LogoutBtn = styled.button`
  width: 90px;
  color: #ffffff;
  background-color: #102e54;
  border: none;
  border-radius: 20px;
  padding: 7px;
  cursor: pointer;

  &:hover {
    background-color: #09192e;
  }
`;

export const MainTitle = styled.div`
  font-size: 42px;
  text-align: center;
  margin-top: 30px;
`;

export const MainDesc = styled.div`
  font-size: 22px;
  color: #757575;
  text-align: center;
  margin: 20px 0 40px 0;
`;

export const MainImg = styled.img`
  width: 100%;
  height: 500px;
`;

export const TestBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

export const TestBtn = styled.button`
  width: 170px;
  font-size: 22px;
  color: #ffffff;
  background-color: #102e54;
  border: none;
  border-radius: 30px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #09192e;
  }
`;

export const MainFooterBox = styled.div`
  border-top: 1px solid #a6a6a6;
  padding: 7px 0;
`;

export const FooterTeam = styled.span`
  font-weight: 700;
  margin: 0 30px;
`;

export const FooterMember = styled.span`
  color: #757575;
  margin-right: 15px;
`;
