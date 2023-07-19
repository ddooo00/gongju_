import React from "react";
import Chart from "../components/result/Chart";
import Comments from "../components/board/Comments";

const Board = () => {
  return (
    <>
      <div>
        결과 차트
        <Chart />
      </div>
      <Comments />
    </>
  );
};

export default Board;
