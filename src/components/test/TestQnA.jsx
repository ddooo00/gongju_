import React, { useState } from "react";
import TestResult from "../result/TestResult";
import { useQuery } from "react-query";
import { getList } from "../../api/testList";
import Result from "../../pages/Result";
import { useNavigate } from "react-router";
import "../../styles/TestQnA.css";

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

  //유형 테스트 QnA
  //테스트 리스트 db 조회(가져오기)
  const { isLoading, isError, data } = useQuery("gongjuList", getList);
  // console.log("data💙💙💙", data);
  if (isLoading) {
    return <div>목록을 가져오는 중..!</div>;
  }
  if (isError) {
    return <div>에러입니다..!</div>;
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

  return (
    <>
      {page <= questionList.length ? (
        <div>
          <div>
            <div>나는 어떤 공주일까?</div>

            {/* 진행 상황 바 */}
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${(page - 1) * (100 / questionList.length)}%`,
                }}
              />
            </div>
            {/* ---- */}

            <div>{`${page} / ${questionList.length}`}</div>
          </div>
          {questionList.map((val, idx) => (
            <div
              key={idx}
              style={{ display: page === idx + 1 ? "flex" : "none" }}
            >
              {/* {console.log(gongjuList)} */}
              {/* 질문 */}
              <div>
                {val.q.map((qval, qidx) => (
                  <div key={qidx}>{qval}</div>
                ))}
              </div>

              <div>
                {/* 선택지 */}
                <div>
                  {val.a.map((aval, aidx) => (
                    <div
                      key={aidx}
                      onClick={() => handleAnswerCount(aval.type, aidx)}
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc", // Add a border to the options
                        borderRadius: "5px", // Optional: Add rounded corners
                        padding: "5px",
                        margin: "5px",
                      }}
                    >
                      {aval.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>테스트가 끝났습니다! 결과를 보러 갈까요?</h1>
          <button
            onClick={() => {
              navigate(`/test/${getMostSelectedType()}`);
            }}
          >
            결과 보러가기
          </button>
        </div>
      )}
    </>
  );
}

export default TestQnA;
