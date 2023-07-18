import React from "react";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();

  const clickToResultPage = () => navigate(`/test/1`);

  return (
    <div>
      <button onClick={clickToResultPage}>결과보기</button>
    </div>
  );
}

export default Test;
