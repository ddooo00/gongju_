import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/style.main";
import YouTube from "react-youtube";
import mainImg from "../../assets/img/main.jpg";

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
    <S.MainContainer>
      <S.MainWrapper>
        <S.LogoutBtnBox>
          {user && <S.LogoutBtn onClick={logOut}>로그아웃</S.LogoutBtn>}
        </S.LogoutBtnBox>
        <S.MainTitle>
          {user
            ? `${user.displayName}은(는) 어떤 공주일까 ?`
            : `나는 어떤 공주일까 ?`}
        </S.MainTitle>
        <S.MainDesc>공주로 알아보는 나의 성격</S.MainDesc>
        {/* <YouTube
            videoId="Vy9RqQPbxi0"
            opts={{ width: "100%", height: "500px" }}
          /> */}
        <S.MainImg src={mainImg} alt="main image" />
        <S.TestBtnBox>
          <S.TestBtn onClick={() => clickOpenHandler(user)}>
            테스트 하기
          </S.TestBtn>
        </S.TestBtnBox>
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
      </S.MainWrapper>
      <S.MainFooterBox>
        <S.FooterTeam>공주들</S.FooterTeam>
        <S.FooterMember>이소영</S.FooterMember>
        <S.FooterMember>이수진</S.FooterMember>
        <S.FooterMember>이우정</S.FooterMember>
        <S.FooterMember>장혜진</S.FooterMember>
        <S.FooterMember>정송주</S.FooterMember>
      </S.MainFooterBox>
    </S.MainContainer>
  );
};

export default Auth;
