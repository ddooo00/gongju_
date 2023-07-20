import React, { useState } from "react";
import { useQuery } from "react-query";
import { getList } from "../../api/testList";
import { useNavigate } from "react-router";
import "../../styles/TestQnA.css";
import { useMutation, useQueryClient } from "react-query";
import { getChart, updateChart } from "../../api/api";
import * as S from "../../styles/style.testQnA";
import Spinner from "../../assets/spinner/spinner.gif";
import Background from "../../styles/style.spinner";

function TestQnA() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  //유형 리스트 관리
  const [gongjuList, setGongjuList] = useState([
    { name: "A", count: 0 },
    { name: "B", count: 0 },
    { name: "C", count: 0 },
    { name: "D", count: 0 },
    { name: "E", count: 0 },
  ]);

  const {
    isLoading: chartIsLoading,
    isError: chartIsError,
    data: chartData,
  } = useQuery("chart", getChart);

  const updateMutation = useMutation(updateChart, {
    onSuccess: () => {
      queryClient.invalidateQueries("chart");
    },
  });

  const queryClient = useQueryClient();

  //유형 테스트 QnA
  //테스트 리스트 db 조회(가져오기)
  const { isLoading, isError, data } = useQuery("gongjuList", getList);
  // console.log("data💙💙💙", data);
  if (isLoading) {
    return (
      <Background>
        잠시만 기다려주세요...
        <img src={Spinner} alt="로딩중" width="5%" />
      </Background>
    );
  }
  if (isError) {
    return <Background>테스트 목록을 가져오지 못했습니다😥</Background>;
  }

  const questionList = data;

  //선택지에 따른 타입 카운트 하는 함수
  const handleAnswerCount = (typeStr, idx) => {
    const types = typeStr.split(","); // type이 여러 개인 경우 콤마(,)로 구분된 배열로 분리

    let ls = gongjuList.map((item) => ({ ...item }));
    types.forEach((type) => {
      const gongjuItem = ls.find((item) => item.name === type);
      if (gongjuItem) {
        gongjuItem.count += 1;
      }
    });

    setGongjuList(ls);
    setPage(page + 1);

    if (idx + 1 === questionList.length) {
      console.log("결과보기");
    }
  };

  // 가장 많이 선택된 유형 찾기
  const getMostSelectedType = () => {
    let maxCount = 0; // 가장 큰 값
    let mostSelectedTypes = []; // 가장 선택 많이 된 값들을 담는 배열

    gongjuList.forEach((item) => {
      if (item.count > maxCount) {
        maxCount = item.count;
        mostSelectedTypes = [item.name];
      } else if (item.count === maxCount) {
        mostSelectedTypes.push(item.name);
      }
    });

    // count가 같은 유형들 중 랜덤으로 하나의 유형 선택
    const randomType =
      mostSelectedTypes[Math.floor(Math.random() * mostSelectedTypes.length)];

    return randomType;
  };

  // 차트 업데이트 함수

  const updateChartHandler = (id) => {
    const originalValue = chartData.find((data) => data.id == id).value;
    const updatedChart = {
      value: originalValue + 1,
    };
    updateMutation.mutate({ id, updatedChart });

    console.log(originalValue);
  };

  return (
    <S.BodyColor>
      {page <= questionList.length ? (
        <S.TestLayout>
          <S.progressBarLayout>
            {/* 진행 상황 바 */}
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${page * (100 / questionList.length)}%`,
                }}
              />
            </div>
            {/* ---- */}
          </S.progressBarLayout>
          <S.PageContainer>{`${page} / ${questionList.length}`}</S.PageContainer>
          {questionList.map((val, idx) => (
            <div key={idx} style={{ display: page === idx + 1 ? "" : "none" }}>
              {/* 질문 */}
              <S.QuestionBox>
                {val.q.map((qval, qidx) => (
                  <div key={qidx}>{qval}</div>
                ))}
              </S.QuestionBox>

              <S.AnswerContainer>
                {/* 선택지 */}
                <div>
                  {val.a.map((aval, aidx) => (
                    <S.AnswerBox
                      key={aidx}
                      onClick={() => handleAnswerCount(aval.type, aidx)}
                    >
                      {aval.text}
                    </S.AnswerBox>
                  ))}
                </div>
              </S.AnswerContainer>
            </div>
          ))}
        </S.TestLayout>
      ) : (
        <S.ResultLayout>
          <S.ResultBox>
            <S.ResultLabel>
              테스트가 끝났습니다! 결과를 보러 갈까요?
            </S.ResultLabel>

            <S.ResultButton
              onClick={() => {
                const selectedType = getMostSelectedType();
                navigate(`/test/${selectedType}`);
                updateChartHandler(selectedType);
              }}
            >
              결과 보러가기
            </S.ResultButton>
          </S.ResultBox>
        </S.ResultLayout>
      )}
    </S.BodyColor>
  );
}

export default TestQnA;
