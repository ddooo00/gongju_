import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useQuery } from "react-query";
import { getChart } from "../../api/api";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";
import * as S from "../../styles/style.chartcomment";

const COLORS = ["#f66a6a", "#59df7f", "#d382f8", "#f9f26c", "#77a9ff"];

const Chart = () => {
  // 데이터를 불러옴
  const { isLoading, isError, data } = useQuery("chart", getChart);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  console.log(data);

  return (
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
  );
};

export default Chart;
