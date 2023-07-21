import React from "react";
import { Cell } from "recharts";
import { useQuery } from "react-query";
import { getChart } from "../../api/api";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";
import * as S from "../../styles/style.chartcomment";
import { useNavigate } from "react-router-dom";
import back from "../../assets/img/back.png";
import Spinner from "../../assets/spinner/spinner.gif";
import Background from "../../styles/style.spinner";

const COLORS = ["#f66a6a", "#59df7f", "#d382f8", "#f9f26c", "#77a9ff"];

const Chart = () => {
  const navigate = useNavigate();
  // 데이터를 불러옴
  const { isLoading, isError, data } = useQuery("chart", getChart);

  if (isLoading) {
    return (
      <Background>
        <img src={Spinner} alt="로딩중" width="5%" />
      </Background>
    );
  }

  if (isError) {
    return <Background>차트를 가져오지 못했습니다😥</Background>;
  }

  return (
    <>
      <S.BackBtn
        onClick={() => {
          navigate(-1); // 이전 페이지로 이동 (-1은 뒤로가기)
        }}
      >
        <img src={back} style={{ width: "40px" }} />
      </S.BackBtn>

      <S.ChartContainer>
        <S.ChartWrapper>
          <S.ChartTitle>나와 같은 공주들은 얼마나 있을까요❓</S.ChartTitle>
          <BarChart
            width={500}
            height={270}
            data={data}
            layout="vertical"
            style={{ marginLeft: "100px" }}
          >
            <XAxis type="number" orientation="top" stroke="#000000" />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              dx={6}
              tickLine={false}
              style={{ fill: "#000000" }}
            />
            <Bar background dataKey="value" barSize={{ height: 26 }}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="amountLabel"
                position="insideRight"
                style={{ fill: "white" }}
              />
            </Bar>
          </BarChart>
          <S.CommentTitle>공주에 대해 이야기를 나눠봅시다❗</S.CommentTitle>
        </S.ChartWrapper>
      </S.ChartContainer>
    </>
  );
};

export default Chart;
