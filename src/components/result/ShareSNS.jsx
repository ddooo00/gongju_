import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as S from "../../styles/style.testResult";

function ShareSNS() {
  //현재 URL 가져오기
  const currentUrl = window.location.href;

  const handleURLCopy = () => {
    window.Clipboard.setData(currentUrl);
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

        <button>카카오톡</button>
      </S.SNSButtonContainer>
    </S.SNSShareLayout>
  );
}

export default ShareSNS;
