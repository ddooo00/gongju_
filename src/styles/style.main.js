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
  padding: 10px 20px;
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
  margin: 10px 0;
`;

export const MainDesc = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 20px 0;
`;

export const TestBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
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
  /* position: fixed; */
  border-top: 1px solid #8c8c8c;
  padding: 7px 0;
`;

export const FooterTeam = styled.span`
  font-weight: 600;
`;

export const FooterMember = styled.span``;
