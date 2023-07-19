import React from "react";
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
      </div>
      <Comments />
    </>
  );
};

export default Board;
