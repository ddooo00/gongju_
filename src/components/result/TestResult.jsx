import React, { useState, useEffect, useRef } from "react";
import { getResult } from "../../api/testList";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getHeritages,
  getRestaurants,
  getCampsites,
  getFestivals,
  getMountains,
} from "../../api/api";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import * as S from "../../styles/style.testResult";
import Background from "../../styles/style.spinner";
import Spinner from "../../assets/spinner/spinner.gif";
import ShareSNS from "./ShareSNS";
import Nonpage from "../../components/NonPage";
import yellowTape from "../../assets/img/yellowtape.png";
import bluePin from "../../assets/img/bluepin.png";
import redPin from "../../assets/img/redpin.png";

function TestResult() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);
  const params = useParams();
  const { id } = params;
  // console.log("id타입값???", id);
  const cardRef = useRef(); // useRef를 사용하여 결과지 컨테이너를 참조합니다.

  const { isLoading, isError, data } = useQuery("gongjuTypeData", getResult);

  const {
    isLoading: isLoadingRestaurants,
    isError: isErrorRestaurants,
    data: dataRestaurants,
  } = useQuery("restaurants", getRestaurants);

  const {
    isLoading: isLoadingHeritages,
    isError: isErrorHeritages,
    data: dataHeritages,
  } = useQuery("heritages", getHeritages);
  const {
    isLoading: isLoadingCampsites,
    isError: isErrorCampsites,
    data: dataCampsites,
  } = useQuery("campsites", getCampsites);

  const {
    isLoading: isLoadingFestivals,
    isError: isErrorFestivals,
    data: dataFestivals,
  } = useQuery("festivals", getFestivals);

  const {
    isLoading: isLoadingMountains,
    isError: isErrorMountains,
    data: dataMountains,
  } = useQuery("mountains", getMountains);

  useEffect(() => {
    // id가 A, B, C, D, E 중 하나인지 확인 (대소문자 구분 없이)
    const upperCaseId = id.toUpperCase();
    if (["A", "B", "C", "D", "E"].includes(upperCaseId)) {
      if (upperCaseId === "A") {
        setDataToShow(dataFestivals);
      } else if (upperCaseId === "B") {
        setDataToShow(dataCampsites);
      } else if (upperCaseId === "C") {
        setDataToShow(dataHeritages);
      } else if (upperCaseId === "D") {
        setDataToShow(dataRestaurants);
      } else if (upperCaseId === "E") {
        setDataToShow(dataMountains);
      }
    } else {
      // id가 A, B, C, D, E 중 하나가 아니라면 에러
      setDataToShow([]);
    }
  }, [
    id,
    dataCampsites,
    dataFestivals,
    dataHeritages,
    dataRestaurants,
    dataMountains,
  ]);

  if (
    isLoadingRestaurants ||
    isLoadingHeritages ||
    isLoadingCampsites ||
    isLoadingFestivals ||
    isLoadingMountains
  ) {
    return (
      <Background>
        잠시만 기다려주세요...
        <img src={Spinner} alt="로딩중" width="5%" />
      </Background>
    );
  }

  if (
    isErrorRestaurants ||
    isErrorHeritages ||
    isErrorCampsites ||
    isErrorFestivals ||
    isErrorMountains
  ) {
    return <Background>결과를 가져오지 못했습니다😥</Background>;
  }

  const clickShowComments = () => navigate(`/board`);

  //결과 db 조회(가져오기)
  // console.log("data💛💛", data);
  if (isLoading) {
    return (
      <Background>
        잠시만 기다려주세요...
        <img src={Spinner} alt="로딩중" width="5%" />
      </Background>
    );
  }
  if (isError) {
    return <Background>결과를 가져오지 못했습니다😥</Background>;
  }

  const gongjuTypeResult = data;

  // 이미지 캡쳐 및 저장 함수
  const onDownloadBtn = () => {
    const card = cardRef.current; // useRef로 참조한 결과지 컨테이너를 가져옵니다.
    html2canvas(card)
      .then((canvas) => {
        // Canvas를 이미지로 변환
        const dataUrl = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "card.png"; // 다운로드할 이미지 파일명
        link.click();
      })

      .catch((error) => {
        console.error("이미지 캡쳐 오류:", error);
      });
    console.log(card);
  };

  return (
    <S.Page ref={cardRef} id="result-container">
      {dataToShow?.length === 0 ? (
        <Nonpage />
      ) : (
        <>
          <S.ButtonContainer>
            <S.Button onClick={() => navigate("/")}>다시하기</S.Button>
            <S.Button onClick={clickShowComments}>결과 이야기 나누기</S.Button>
          </S.ButtonContainer>
          {gongjuTypeResult.map((princess) => {
            if (id?.includes(princess.type)) {
              return (
                <S.BoxLocation key={princess.type}>
                  <div>
                    <S.TypeCharacter
                      src={princess.imageURL}
                      alt="사진을 가져오지 못했습니다."
                    />
                  </div>
                  <S.GongjuTypeContainer>
                    <S.GongjuExName>
                      <S.GomgjuNickname> {princess.text} </S.GomgjuNickname>

                      <S.GongjuTypeLabel>
                        <label>{princess.name}</label> 공주
                      </S.GongjuTypeLabel>
                    </S.GongjuExName>
                    <S.Description>{princess.description}</S.Description>
                  </S.GongjuTypeContainer>
                </S.BoxLocation>
              );
            }
            // else {
            //   return <div>결과값이 없습니다..!</div>;
            // }
          })}
          <S.Place>
            <S.ImageBox>
              <S.ImageStickerBlue
                src={bluePin}
                alt="스티커를 가져오지 못했습니다."
              ></S.ImageStickerBlue>
              <S.ImageStickerYellowT
                src={yellowTape}
                alt="스티커를 가져오지 못했습니다."
              ></S.ImageStickerYellowT>
              <S.ImageStickerYellowB
                src={yellowTape}
                alt="스티커를 가져오지 못했습니다."
              ></S.ImageStickerYellowB>
              <S.ImageStickerRed
                src={redPin}
                alt="스티커를 가져오지 못했습니다."
              ></S.ImageStickerRed>
              {dataToShow?.map((dataItem) => {
                return (
                  <ul key={dataItem.id}>
                    <S.ImageTitle>{dataItem.title}</S.ImageTitle>
                    <S.ImageContainer>
                      <S.Image src={dataItem.img} style={{ width: "300px" }} />
                    </S.ImageContainer>

                    <S.DetailButton
                      onClick={() => {
                        navigate(`/detail/${dataItem.id}`);
                      }}
                    >
                      상세보기
                    </S.DetailButton>
                  </ul>
                );
              })}
            </S.ImageBox>
          </S.Place>
          <S.FooterTitle> 친구들과 결과를 공유해봐요!</S.FooterTitle>
          <ShareSNS />
        </>
      )}
    </S.Page>
  );
}

export default TestResult;
