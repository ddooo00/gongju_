import { styled } from "styled-components";
import modalImg from "../assets/img/modal.jpeg";

export const MainContainer = styled.div`
  background-color: #dce6ef;
`;

export const MainWrapper = styled.div`
  max-width: 1200px;
  min-width: 800px;
  min-height: 100vh;
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
  margin-top: 40px;
`;

export const MainDesc = styled.div`
  font-size: 22px;
  color: #757575;
  text-align: center;
  margin: 30px 0 40px 0;
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

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #9c9c9cc1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  background-image: url(${modalImg});
  background-repeat: no-repeat;
  background-size: contain;
  /* border-radius: 10px; */
`;

export const ModalXBtn = styled.div`
  font-size: 22px;
  text-align: right;
  padding: 15px;
  cursor: pointer;
`;

export const SignInTitle = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 50px 0 30px 0;
`;

export const SignInForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SignInInput = styled.input`
  width: 250px;
  border: 2px solid #102e54;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const SignInBtn = styled.button`
  width: 150px;
  font-size: 20px;
  color: #ffffff;
  background-color: #102e54;
  border: none;
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover {
    background-color: #09192e;
  }
`;

export const SignInSocialDesc = styled.div`
  color: #757575;
  font-size: 14px;
  margin-top: 20px;
`;

export const SignInSocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignInSocialLogo = styled.img`
  width: 50px;
  height: 50px;
  padding: 15px;
  cursor: pointer;
`;

export const SignUpTitle = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 50px 0 30px 0;
`;

export const SignUpForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SignUpInput = styled.input`
  width: 250px;
  border: 2px solid #102e54;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const SignUpBtn = styled.button`
  width: 150px;
  font-size: 20px;
  color: #ffffff;
  background-color: #102e54;
  border: none;
  border-radius: 15px;
  padding: 5px;
  margin-top: 20px;
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
  font-weight: 600;
  margin: 0 30px;
`;

export const FooterMember = styled.span`
  /* position: fixed; */
  color: #a6a6a6;
  margin-right: 15px;
`;
