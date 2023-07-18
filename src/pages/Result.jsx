import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board";

function Result() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const clickShowComments = () => navigate(`/board`);

  return (
    <div>
      <button onClick={clickShowComments}>전체 결과 보러가기</button>
      {isOpen && <Board />}
    </div>
  );
}

export default Result;
