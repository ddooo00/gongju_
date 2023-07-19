import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default Auth;
