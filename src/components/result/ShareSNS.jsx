//https://developers.kakao.com/docs/latest/ko/message/js-link
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import KakaoLogo from "../../assets/img/kakao.png";
import * as S from "../../styles/style.testResult";
import { useScript } from "../../hooks/useScript";
import { useEffect } from "react";

function ShareSNS() {
  // kakao SDK import하기
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  // console.log("kakaoStatus!!!!", status); //최초 렌더링하면 상태가 loading 하다가 ready로 됨

  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화 시도
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      }
    }
  }, [status]);

  //현재 URL 가져오기
  const currentUrl = window.location.href;

  //URL 복사 공유
  const handleURLCopy = () => {
    window.navigator.clipboard.writeText(currentUrl).then(() => {
      alert("복사 완료!");
    });
  };

  //카카오톡 공유(직접 만든 버튼으로 내보내기 메세지 종류: 스크랩)
  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
      templateArgs: { name: "kakao" },
    });
  };

  return (
    <S.SNSShareLayout>
      <S.SNSButtonContainer>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24} />
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={48} round={true} borderRadius={24} />
        </TwitterShareButton>

        <S.URLShareButton
          onClick={() => {
            handleURLCopy();
          }}
        >
          URL
        </S.URLShareButton>
        <S.KakaoShareButton onClick={handleKakaoButton}>
          <S.KakaoIcon src={KakaoLogo}></S.KakaoIcon>
        </S.KakaoShareButton>
      </S.SNSButtonContainer>
    </S.SNSShareLayout>
  );
}

export default ShareSNS;
