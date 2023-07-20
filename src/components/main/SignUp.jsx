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
      <div>공주님, 회원가입이 먼저랍니다 ! </div>
      <form>
        <label htmlFor="email">email : </label>
        <input
          type="text"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
        <label htmlFor="password">password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        <label htmlFor="displayName">displayName : </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => onChangeDisplayName(e.target.value)}
        />
        <button onClick={signUp}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
