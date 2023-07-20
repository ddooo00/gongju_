import React, { useEffect } from "react";
import { Map, Marker } from "react-kakao-maps";

const KakaoMap = ({ address }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}`;
    document.head.appendChild(script);

    script.onload = () => {
      // 지도에 주소-좌표 변환 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const latitude = result[0].y; // 위도
          const longitude = result[0].x; // 경도

          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };

          // 맵 생성
          const map = new window.kakao.maps.Map(container, options);

          // 마커를 놓을 포지션 지정
          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );

          // 주어진 장소에 마커 놓기
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 지도에 마커 추가
          marker.setMap(map);

          // 지도에 컨트롤추가
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );

          // 확대축소 제어 컨트롤 추가
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        }
      });
    };

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <div
      id="map"
      style={{ width: "700px", height: "550px", margin: "0 auto" }}
    />
  );
};

export default KakaoMap;
