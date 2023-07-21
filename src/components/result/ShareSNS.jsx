import React from "react";
import * as S from "../../styles/style.testResult";

function ShareSNS() {
  return (
    <S.SNSShareLayout>
      <S.SNSButtonContainer>
        <button>페북</button>
        <button>트위터</button>
        <button>URL</button>
        <button>카카오톡</button>
      </S.SNSButtonContainer>
    </S.SNSShareLayout>
  );
}

export default ShareSNS;
