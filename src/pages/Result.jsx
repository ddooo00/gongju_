import React from "react";

function Result({ result }) {
  // 결과 값에 따라 해당하는 유형 표시하기
  return (
    <div>
      {result === "A" && (
        <div>
          파티 is my Life <br />
          '셀럽 공주'
        </div>
      )}
      {result === "B" && (
        <div>
          #오운완 <br />
          '근육 공주'
        </div>
      )}
      {result === "C" && (
        <div>
          누워서 A+먹기 <br />
          '똑똑 공주'
        </div>
      )}
      {result === "D" && (
        <div>
          공주 배고파서 힘 없져 <br />
          '먹방 공주'
        </div>
      )}
      {result === "E" && (
        <div>
          카메라는 나와 한몸 <br />
          '감성 공주'
        </div>
      )}
    </div>
  );
}

export default Result;
