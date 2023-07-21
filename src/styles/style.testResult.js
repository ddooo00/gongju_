import { styled } from "styled-components";

export const Page = styled.div`
  background-color: #f4f9dd;
  min-height: 100vh;
`;

export const ButtonContainer = styled.div`
  float: right;
  margin-top: 15px;
  margin-right: 20px;
`;

export const Button = styled.button`
  background-color: #102e54;
  color: white;
  border-radius: 18px;
  padding: 13px;
  margin-right: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #09192e;
  }
`;

export const DetailButton = styled.button`
  cursor: pointer;
  background-color: #102e54;
  color: white;
  border-radius: 10px;
  margin-left: 125px;
  margin-top: 5px;
  width: 65px;
  height: 30px;

  padding: 7px;
  border: none;
  &:hover {
    background-color: #09192e;
  }
`;

export const TypeCharacter = styled.img`
  width: 300px;
  height: auto;
  margin: 115px 15px 0 0;
`;

// 장소 추천
export const Place = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

export const Description = styled.pre`
  background-color: #e5d3a9;
  padding: 30px;
  text-align: center;
  line-height: 22px;
  margin-bottom: 10px;
  line-height: 30px;
  border-radius: 7px;
`;

export const GongjuTypeContainer = styled.div`
  margin-top: 64px;
`;

export const GongjuExName = styled.div`
  font-size: 30px;
  // margin-left: 250px;
  text-align: center;
  font-weight: 600;
  margin-top: 30px;
`;

export const GongjuTypeLabel = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const BoxLocation = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  margin-left: 200px;
`;

export const ImageTitle = styled.li`
  margin-left: 9px;
  text-align: center;
`;

export const ImageBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  object-fit: cover;
  width: 300px;
  height: 200px;
  margin: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;

export const ImageStickerBlue = styled.img`
  position: absolute;
  top: -2;
  left: -3%;
`;

export const ImageStickerYellow = styled.img`
  position: absolute;
  /* left: 0%; */
  /* bottom: 0%; */
`;

export const ImageStickerRed = styled.img`
  position: absolute;
  top: -1%;
  right: -2%;
`;

export const FooterTitle = styled.div`
  color: #503b3b;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
`;

export const GomgjuNickname = styled.div`
  font-size: 20px;
`;

export const SNSShareLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const SNSButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 14px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
  &:hover {
    background-color: #a99fee;
  }
`;

export const KakaoShareButton = styled.a`
  cursor: pointer;
`;

export const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;
