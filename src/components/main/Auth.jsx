import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import Comments from "../result/Comments";
import { useNavigate } from "react-router-dom";
import "../../styles/disney.css";
import a from "../../assets/img/스크린샷 2023-07-19 112531.png";
import b from "../../assets/img/스크린샷 2023-07-19 112601.png";
import c from "../../assets/img/스크린샷 2023-07-19 112622.png";
import d from "../../assets/img/스크린샷 2023-07-19 112651.png";
import e from "../../assets/img/스크린샷 2023-07-19 112704.png";
import f from "../../assets/img/스크린샷 2023-07-19 112720.png";
import g from "../../assets/img/스크린샷 2023-07-19 112809.png";

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenPage, setIsOpenPage] = useState(false);

  // 로그아웃
  const logOut = async (event) => {
    event.preventDefault();

    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        console.log(user);
      } else {
        setUser(null);
        setName("");
        console.log(user);
      }
    });
  }, []);

  const clickOpenHandler = (user) => {
    if (user) {
      setIsOpenPage(true);
      navigate(`/test`);
    } else {
      setIsOpenModal(true);
      setIsOpen(true);
    }
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={() => clickOpenHandler(user)}>테스트하기</button>
      {user && (
        <>
          <button onClick={logOut}>로그아웃</button>
          {name}님 안녕하세요
        </>
      )}
      {isOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#dededeb6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "50%",
                height: "40%",
                backgroundColor: "#ffffff",
                borderRadius: "15px",
              }}
            >
              <SignIn closeModal={closeModal} />
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </>
      )}

      <div className="carousel-container">
        <div className="carousel">
          {/* 여기에 디즈니 공주 이미지들을 추가해주세요. */}
          <img src={a} alt="Princess 1" />
          <img src={b} alt="Princess 2" />
          <img src={c} alt="Princess 3" />
          <img src={d} alt="Princess 3" />
          <img src={e} alt="Princess 3" />
          <img src={f} alt="Princess 3" />
          <img src={g} alt="Princess 3" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
