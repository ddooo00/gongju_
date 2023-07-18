import React from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { answers } = location.state;

  const countAnswers = {};
  answers.forEach((answer) => {
    const options = answer.split(",");
    options.forEach((option) => {
      countAnswers[option] = (countAnswers[option] || 0) + 1;
    });
  });

  const sortedAnswers = Object.entries(countAnswers).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div>
      <h1>선택한 답변들의 결과</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>답변</th>
            <th>누적 횟수</th>
            <th>백분율</th>
          </tr>
        </thead>
        <tbody>
          {sortedAnswers.map((entry, index) => {
            const option = entry[0];
            const count = entry[1];
            const percentage = ((count / answers.length) * 100).toFixed(2);
            return (
              <tr key={index}>
                <td>{option}</td>
                <td>{count}</td>
                <td>{percentage}%</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Result;
