import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getHeritages,
  getRestaurants,
  getCampsites,
  getFestivals,
  getMountains,
} from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function Result() {
  const [dataToShow, setDataToShow] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

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
    if (id === "1") {
      setDataToShow(dataFestivals);
    } else if (id === "2") {
      setDataToShow(dataCampsites);
    } else if (id === "3") {
      setDataToShow(dataHeritages);
    } else if (id === "4") {
      setDataToShow(dataRestaurants);
    } else if (id === "5") {
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

  return (
    <>
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
    </>
  );
}

export default Result;
