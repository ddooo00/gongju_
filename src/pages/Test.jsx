import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [page, setPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const navigate = useNavigate();

  const handleAnswerClick = (selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      selectedAnswer,
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  const handleFinishTest = () => {
    navigate("/Result", { state: { answers: selectedAnswers } });
  };

  const isLastPage = page === 10;

  return (
    <div>
      {page === 1 && (
        <>
          <h1>마녀가 나타나서 사과대신 ㅇㅇ을 주었다</h1>
          <button onClick={() => handleAnswerClick("b")}>비타민</button>
          <button onClick={() => handleAnswerClick("a")}>100만 구독자</button>
          <button onClick={() => handleAnswerClick("c,e")}>주먹도끼</button>
          <button onClick={() => handleAnswerClick("d")}>쿠폰</button>
        </>
      )}
      {page === 2 && (
        <>
          <h1>갑자기 요정이 나타나서 원하는 것을 들어준다고 한다</h1>
          <button onClick={() => handleAnswerClick(" b,c")}>
            곤듀 바디는 100만불짜리 바디 '바디'
          </button>
          <button onClick={() => handleAnswerClick("a")}>
            도심과 10분 떨어진 '100평 궁전(자가)'
          </button>
          <button onClick={() => handleAnswerClick("d")}>
            파워 블로거는 나의 꿈
          </button>
          <button onClick={() => handleAnswerClick("e")}>
            비오는 날이 제일 좋아 나는야 비의 공주
          </button>
        </>
      )}
      {page === 3 && (
        <>
          <h1>
            친구와 같이 시험공부를 하기로 했는데 지각한 당신. 친구는 단단히 화가
            난 상태. 어떻게. 친구의 화를 풀어주지 ?
          </h1>
          <button onClick={() => handleAnswerClick("d,e")}>
            맛있는 거 먹으면 금방 풀리지! 공부하기 전, 인스타 맛집으로 데려간다.
          </button>
          <button onClick={() => handleAnswerClick("c")}>
            {" "}
            그래도 공부는 해야지! 친구가 원하던 족보를 넘겨주고 같이하자!
          </button>
          <button onClick={() => handleAnswerClick("a")}>
            지각했는데 공부는 무슨! 술이나 마시러가자.
          </button>
          <button onClick={() => handleAnswerClick("b")}>
            {" "}
            난 줄게없다. 친구 집 앞까지 찾아가서 싹싹 빈다.
          </button>
        </>
      )}
      {page === 4 && (
        <>
          <h1>
            길을 건너려고 하는데 건너편에서 무언가가 나를 향해 달려오고 있다.
            달려오고 있는 것은 무엇일까 ?{" "}
          </h1>
          <button onClick={() => handleAnswerClick("b")}> 자전거 </button>
          <button onClick={() => handleAnswerClick("a,d")}>전애인</button>
          <button onClick={() => handleAnswerClick("e")}>얼룩말</button>
          <button onClick={() => handleAnswerClick("c")}>경</button>
        </>
      )}
      {page === 5 && (
        <>
          <h1>친구 생일 파티에 잘생긴 사람을 봤다.</h1>
          <button onClick={() => handleAnswerClick("c")}>
            {" "}
            먼저 다가가 말을 건다.
          </button>
          <button onClick={() => handleAnswerClick("b")}>
            어깨동무를 하며 친한 척을 한다.
          </button>
          <button onClick={() => handleAnswerClick("d,e")}>
            {" "}
            그냥 맛있는 거 먹으면서 사진이나 찍는다.
          </button>
          <button onClick={() => handleAnswerClick("a")}>
            춤을 추면서 다가가서 인사한다.
          </button>
        </>
      )}
      {page === 6 && (
        <>
          <h1>길을 가다가 곰인형을 발견했다. 곰인형을 앞에서 보면?</h1>
          <button onClick={() => handleAnswerClick("a")}>
            윙크를 하고 있다.
          </button>
          <button onClick={() => handleAnswerClick("b")}>
            공과 배트를 가지고 있다.
          </button>
          <button onClick={() => handleAnswerClick("d,e")}>
            책과 벌꿀통을 들고있다.
          </button>
          <button onClick={() => handleAnswerClick("c")}>
            아무것도 들고 있지 않다.
          </button>
        </>
      )}
      {page === 7 && (
        <>
          <h1>산에 올라갔는데 산삼을 찾았다!!</h1>
          <button onClick={() => handleAnswerClick("b")}>
            바로 땅 파서 심 봤다!를 외친다
          </button>
          <button onClick={() => handleAnswerClick("c,d")}>
            조심히 챙겨서 비싸게 판다
          </button>
          <button onClick={() => handleAnswerClick("e")}>
            우와~대박이야 하며 사진을 찍어 SNS에 자랑한다.
          </button>
          <button onClick={() => handleAnswerClick("a")}>
            집 가서 잔치를 벌인다.
          </button>
        </>
      )}

      {page === 8 && (
        <>
          <h1>
            {" "}
            5분뒤에 시내 한복판에 핵폭탄이 떨어진다고 한다. 당신의 행동은 ?
          </h1>
          <button onClick={() => handleAnswerClick("a")}>
            어차피 죽을거 가족, 지인과 작별인사를 하고 멋지게 죽는다.
          </button>
          <button onClick={() => handleAnswerClick("d")}>
            먹고 죽은 귀신이 때깔도 곱다. 뭐라도 하나 더 먹자
          </button>
          <button onClick={() => handleAnswerClick("b,c")}>
            최대한 힘을 다해 도망가자. 지하로 도망가면 살수도 있다
          </button>
          <button onClick={() => handleAnswerClick("e")}>
            마지막으로 기도해야지.
          </button>
        </>
      )}
      {page === 9 && (
        <>
          <h1>놀이공원 폐장 30분 전이다. 이때 나는 ? </h1>
          <button onClick={() => handleAnswerClick("d")}>
            아까 못먹은 츄러스가 생각이 나 줄을 서 사먹는다
          </button>
          <button onClick={() => handleAnswerClick("a,b")}>
            마지막으로 아까 제일 재밌었던 놀이기구를 한 번 더 타러 간다.
          </button>
          <button onClick={() => handleAnswerClick("e")}>
            아직 인생샷을 건지지 못한 걸 깨닫고 사진을 더 찍는다.{" "}
          </button>
          <button onClick={() => handleAnswerClick("c")}>
            {" "}
            이제 놀만큼 놀았으니까 놀이공원을 나간다.
          </button>
        </>
      )}
      {page === 10 && (
        <>
          <h1>씨앗을 심으려고 한다. 어떤 씨앗을 심을 것인가?</h1>
          <button onClick={() => handleAnswerClick("a,e")}>
            빛나는 황금빛 씨앗
          </button>
          <button onClick={() => handleAnswerClick("d")}>
            엄청나게 커다란 씨앗
          </button>
          <button onClick={() => handleAnswerClick("b")}>
            돌만큼 단단한 씨앗
          </button>
          <button onClick={() => handleAnswerClick("c")}>
            내가 잘 알고 있는 씨앗
          </button>
          <button onClick={handleFinishTest}>테스트 완료</button>
        </>
      )}
      {isLastPage && handleFinishTest()}
    </div>
  );
};

export default Test;
