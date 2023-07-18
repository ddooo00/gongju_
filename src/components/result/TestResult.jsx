import React from "react";
import aPrincess from "../../assets/img/aPrincess.png";
import bPrincess from "../../assets/img/bPrincess.png";
import cPrincess from "../../assets/img/cPrincess.png";
import dPrincess from "../../assets/img/dPrincess.png";
import ePrincess from "../../assets/img/ePrincess.png";

function TestResult({ result }) {
  // 결과 값에 따라 해당하는 유형 표시하기
  // console.log("결과타입>>", result);
  return (
    <div>
      {result === "A" && (
        <div>
          파티 is my Life⭐ <br />
          '셀럽 공주' <br />
          <img src={aPrincess} alt="셀럽" />
        </div>
      )}
      {result === "B" && (
        <div>
          #오운완🔥 <br />
          '근육 공주'
          <br />
          <img src={bPrincess} alt="근육" />
        </div>
      )}
      {result === "C" && (
        <div>
          누워서 A+먹기✏️ <br />
          '똑똑 공주'
          <br />
          <img src={cPrincess} alt="똑똑" />
        </div>
      )}
      {result === "D" && (
        <div>
          공주 배고파서 힘 없져😭
          <br />
          '먹방 공주'
          <br />
          <img src={dPrincess} alt="먹방" />
        </div>
      )}
      {result === "E" && (
        <div>
          카메라는 나와 한몸📸 <br />
          '감성 공주'
          <br />
          <img src={ePrincess} alt="감성" />
        </div>
      )}
    </div>
  );
}

export default TestResult;
