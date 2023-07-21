import React from "react";
import { useNavigate } from "react-router-dom";

function NonPage() {
  const navigate = useNavigate();
  return (
    <div style={{ background: "#F4F9DD", height: "100vh" }}>
      <div style={{ textAlign: "center", paddingTop: "20%" }}>
        <h1
          style={{
            fontSize: "30px",
            color: "#503B3B",
            fontWeight: "bold",
          }}
        >
          존재하지 않는 페이지 입니다.
        </h1>
        <button
          style={{
            background: "#102E54",
            color: "white",
            width: "100px",
            height: "30px",
            marginTop: "10px",
            fontSize: "16px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          처음으로
        </button>
      </div>
    </div>
  );
}

export default NonPage;
