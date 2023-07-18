import React from "react";
import { getResult } from "../../api/testList";
import { useQuery } from "react-query";

function TestResult({ results }) {
  //결과 db 조회(가져오기)
  const { isLoading, isError, data } = useQuery("gongjuTypeData", getResult);
  // console.log("data💛💛", data);
  if (isLoading) {
    return <div>결과를 가져오는 중..!</div>;
  }
  if (isError) {
    return <div>에러입니다..!</div>;
  }

  const gongjuTypeResult = data;
  console.log("공주 타입 결과`!~!!~~!~", gongjuTypeResult);

  return (
    <div>
      {gongjuTypeResult.map((princess) => {
        if (results.includes(princess.type)) {
          return (
            <div key={princess.type}>
              {princess.text} <br />'{princess.name} 공주' <br />
              <img src={princess.imageURL} alt="사진을 가져오지 못했습니다." />
            </div>
          );
        }
        // else {
        //   return <div>결과값이 없습니다..!</div>;
        // }
      })}
    </div>
  );
}

export default TestResult;
