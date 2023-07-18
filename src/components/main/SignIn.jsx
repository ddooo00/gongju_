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

const SignIn = ({ closeModal }) => {
  const [email, onChangeEmail, resetEmail] = useInput();
  const [password, onChangePassword, resetPassword] = useInput();
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

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
      console.error(error);
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
            <div>
              <button onClick={signIn}>로그인</button>
              <button name="google" onClick={socialSignIn}>
                구글로그인
              </button>
              <button name="github" onClick={socialSignIn}>
                깃허브로그인
              </button>
            </div>
          </form>
          <button onClick={clickChangeModal}>회원가입</button>
        </>
      )}
    </div>
  );
};

export default SignIn;
