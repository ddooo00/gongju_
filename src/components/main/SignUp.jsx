import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { auth } from "../../service/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as S from "../../styles/style.main";

const SignUp = ({ setIsOpenSignUpModal }) => {
  const [email, onChangeEmail, resetEmail] = useInput();
  const [password, onChangePassword, resetPassword] = useInput();
  const [confirmP, onChangeConfirmP, resetConfirmP] = useInput();
  const [displayName, onChangeDisplayName, resetDisplayName] = useInput();

  // 회원가입
  const signUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
      });

      setIsOpenSignUpModal(false);
      signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <S.SignUpTitle>공주님, 회원가입이 먼저랍니다 ! </S.SignUpTitle>
      <S.SignUpForm>
        <S.SignUpInput
          type="text"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="이메일을 입력해 주세요"
        />
        <S.SignUpInput
          type="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
        />
        <S.SignUpInput
          type="confirmP"
          value={confirmP}
          onChange={(e) => onChangeConfirmP(e.target.value)}
          placeholder="비밀번호를 다시 입력해 주세요"
        />
        <S.SignUpInput
          type="text"
          value={displayName}
          onChange={(e) => onChangeDisplayName(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
        />
        <div></div>
        <S.SignUpBtn onClick={signUp}>회원가입</S.SignUpBtn>
      </S.SignUpForm>
    </div>
  );
};

export default SignUp;
