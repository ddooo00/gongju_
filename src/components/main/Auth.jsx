import React, { useEffect, useState } from "react";
import { auth } from "../../service/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/style.main";
import YouTube from "react-youtube";
import mainImg from "../../assets/img/main.jpg";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
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
        setDisplayName(user.displayName);
        console.log(user);
      } else {
        setUser(null);
        setDisplayName("");
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

  const clickToGithub = (e) => {
    const name = e.target.name;
    console.log(name);

    if (name === "lsy") {
      navigate(`https://github.com/ddooo00`);
    } else if (name === "lsj") {
      navigate(`https://github.com/leesoojinn`);
    } else if (name === "lwj") {
      navigate(`https://github.com/Passionhruit`);
    } else if (name === "jhj") {
      navigate(`https://github.com/huizhenz`);
    } else if (name === "jsj") {
      navigate(`https://github.com/songjuu`);
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
          {user && user.displayName !== null
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
          <S.ModalWrapper>
            <S.ModalBox>
              <S.ModalXBtn onClick={closeModal}>X</S.ModalXBtn>
              <SignIn closeModal={closeModal} />
            </S.ModalBox>
          </S.ModalWrapper>
        )}
      </S.MainWrapper>
      <S.MainFooterBox>
        <S.FooterTeam>공주들</S.FooterTeam>
        <S.FooterMember name="lsy" onClick={clickToGithub}>
          이소영
        </S.FooterMember>
        <S.FooterMember name="lsj" onClick={clickToGithub}>
          이수진
        </S.FooterMember>
        <S.FooterMember name="lwj">이우정</S.FooterMember>
        <S.FooterMember name="jhj">장혜진</S.FooterMember>
        <S.FooterMember name="jsj">정송주</S.FooterMember>
      </S.MainFooterBox>
    </S.MainContainer>
  );
};

export default Auth;
