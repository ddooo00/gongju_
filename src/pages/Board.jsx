import React from "react";
import Chart from "../components/result/Chart";
import Comments from "../components/board/Comments";

const Board = () => {
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          height: "300px",
          margin: "10px",
          padding: "10px",
        }}
      >
        결과 차트
        <Chart />
      </div>
      <Comments />
    </>
  );
};

export default Board;
