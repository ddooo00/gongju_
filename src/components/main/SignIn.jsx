import React, { useState } from "react";
import { auth } from "../../service/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import useInput from "../../hooks/useInput";
import SignUp from "./SignUp";
import * as S from "../../styles/style.main";
import googleLogo from "../../assets/img/google.png";
import githubLogo from "../../assets/img/github.png";

const SignIn = ({ closeModal }) => {
  const [email, onChangeEmail, resetEmail] = useInput();
  const [password, onChangePassword, resetPassword] = useInput();
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [error, setError] = useState("");

  // 로그인
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      closeModal();
    } catch (error) {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("이메일을 입력해 주세요.");
      } else if (error.message === "Firebase: Error (auth/missing-password).") {
        setError("비밀번호를 입력해 주세요.");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("일치하는 정보가 없습니다. 다시 입력해주세요.");
      }
    }
  };

  // 소셜 로그인
  const socialSignIn = async (e) => {
    e.preventDefault();

    try {
      const {
        target: { name },
      } = e;

      let provider;
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      const userCredential = await signInWithPopup(auth, provider);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const clickChangeModal = () => {
    setIsOpenSignUpModal(true);
  };

  return (
    <div>
      {isOpenSignUpModal ? (
        <SignUp
          isOpenSignUpModal={isOpenSignUpModal}
          setIsOpenSignUpModal={setIsOpenSignUpModal}
        />
      ) : (
        <>
          <S.SignInTitle>공주님, 로그인하실 시간입니다 !</S.SignInTitle>
          <S.SignInForm>
            <S.SignInInput
              type="text"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
            />
            <S.SignInInput
              type="password"
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
            />
            <S.SignInErrMessage>{error}</S.SignInErrMessage>
            <S.SignInBtn onClick={signIn}>로그인</S.SignInBtn>
            <S.SignInBtn onClick={clickChangeModal}>회원가입</S.SignInBtn>
            <S.SignInSocialDesc>
              공주님, 물론 소셜 로그인도 가능하답니다 !
            </S.SignInSocialDesc>
            <S.SignInSocialBox>
              <S.SignInSocialLogo
                src={googleLogo}
                alt="google logo"
                name="google"
                onClick={socialSignIn}
              />
              <S.SignInSocialLogo
                src={githubLogo}
                alt="github logo"
                name="github"
                onClick={socialSignIn}
              />
            </S.SignInSocialBox>
          </S.SignInForm>
        </>
      )}
    </div>
  );
};

export default SignIn;
