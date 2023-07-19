import React, { useState, useEffect, useRef } from "react";
import { getResult } from "../../api/testList";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Board from "../../pages/Board";
import {
  getHeritages,
  getRestaurants,
  getCampsites,
  getFestivals,
  getMountains,
} from "../../api/api";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";

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
    if (id === "A") {
      setDataToShow(dataFestivals);
    } else if (id === "B") {
      setDataToShow(dataCampsites);
    } else if (id === "C") {
      setDataToShow(dataHeritages);
    } else if (id === "D") {
      setDataToShow(dataRestaurants);
    } else if (id === "E") {
      setDataToShow(dataMountains);
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
    return <h1>로딩중...</h1>;
  }

  if (
    isErrorRestaurants ||
    isErrorHeritages ||
    isErrorCampsites ||
    isErrorFestivals ||
    isErrorMountains
  ) {
    return <h1>로딩 중 오류가 발생하였습니다.</h1>;
  }

  const clickShowComments = () => navigate(`/board`);

  //결과 db 조회(가져오기)
  // console.log("data💛💛", data);
  if (isLoading) {
    return <div>결과를 가져오는 중..!</div>;
  }
  if (isError) {
    return <div>에러입니다..!</div>;
  }

  const gongjuTypeResult = data;

  // 이미지 캡쳐 및 저장 함수
  const onDownloadBtn = () => {
    const card = cardRef.current; // useRef로 참조한 결과지 컨테이너를 가져옵니다.
    html2canvas(card)
      .then((canvas) => {
        // Canvas를 이미지로 변환
        const dataUrl = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "card.png"; // 다운로드할 이미지 파일명
        link.click();
      })
      .catch((error) => {
        console.error("이미지 캡쳐 오류:", error);
      });
  };

  return (
    <div ref={cardRef} id="result-container">
      <button onClick={onDownloadBtn}>저장</button>
      <button onClick={clickShowComments}>전체 결과 보러가기</button>
      {gongjuTypeResult.map((princess) => {
        if (id?.includes(princess.type)) {
          return (
            <div key={princess.type}>
              {princess.text} <br />'{princess.name} 공주' <br />
              <img src={princess.imageURL} alt="사진을 가져오지 못했습니다." />
              <pre>{princess.description}</pre>
              <pre>{princess.recommend}</pre>
            </div>
          );
        }
        // else {
        //   return <div>결과값이 없습니다..!</div>;
        // }
      })}
      <h1>당신에게 어울리는 공주는 ?</h1>
      <div>
        {dataToShow?.map((dataItem) => {
          return (
            <ul key={dataItem.id}>
              <li>{dataItem.title}</li>
              <img src={dataItem.img} style={{ width: "300px" }} />
              <button
                onClick={() => {
                  navigate(`/detail/${dataItem.id}`);
                }}
              >
                상세보기
              </button>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default TestResult;
