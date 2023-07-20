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
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const [confirmP, onChangeConfirmP] = useInput();
  const [displayName, onChangeDisplayName] = useInput();
  const [error, setError] = useState("");

  // 회원가입
  const signUp = async (e) => {
    e.preventDefault();

    if (password !== confirmP) {
      return setError("비밀번호가 일치하지 않습니다.");
    } else if (!displayName) {
      return setError("닉네임을 입력해 주세요.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
      });

      alert("회원가입에 성공하였습니다.");
      setIsOpenSignUpModal(false);
      signOut(auth);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/missing-email).") {
        setError("이메일을 입력해 주세요.");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("이메일 형식이 올바르지 않습니다.");
      } else if (error.message === "Firebase: Error (auth/missing-password).") {
        setError("비밀번호를 입력해 주세요.");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("비밀번호를 6자리 이상 입력해 주세요.");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setError("이미 가입한 이메일입니다. 확인해 주세요.");
      }
    }
  };

  return (
    <div>
      <S.SignUpTitle>공주님, 회원가입이 먼저랍니다 ! </S.SignUpTitle>
      <S.SignUpForm>
        <S.SignUpInputBox>
          <S.SignUpLabel htmlFor="email">이메일</S.SignUpLabel>
          <S.SignUpInput
            type="text"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요"
          />
        </S.SignUpInputBox>
        <S.SignUpInputBox>
          <S.SignUpLabel htmlFor="password">
            비밀번호
            <S.SignUpPwInfo>(6자리 이상 입력해 주세요)</S.SignUpPwInfo>
          </S.SignUpLabel>
          <S.SignUpInput
            type="password"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </S.SignUpInputBox>
        <S.SignUpInputBox>
          <S.SignUpLabel htmlFor="confirmP">비밀번호 확인</S.SignUpLabel>
          <S.SignUpInput
            type="password"
            value={confirmP}
            onChange={(e) => onChangeConfirmP(e.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요"
          />
        </S.SignUpInputBox>
        <S.SignUpInputBox>
          <S.SignUpLabel htmlFor="displayName">닉네임</S.SignUpLabel>
          <S.SignUpInput
            type="text"
            value={displayName}
            onChange={(e) => onChangeDisplayName(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />
        </S.SignUpInputBox>
        <S.SignUpErrMessage>{error}</S.SignUpErrMessage>
        <S.SignUpBtn onClick={signUp}>회원가입</S.SignUpBtn>
      </S.SignUpForm>
    </div>
  );
};

export default SignUp;
