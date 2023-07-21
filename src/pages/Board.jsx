import React from "react";
import Chart from "../components/result/Chart";
import Comments from "../components/board/Comments";
import * as S from "../styles/style.chartcomment";

const Board = () => {
  return (
    <S.Board>
      <div>
        <Chart />
      </div>
      <Comments />
    </S.Board>
  );
};

export default Board;
