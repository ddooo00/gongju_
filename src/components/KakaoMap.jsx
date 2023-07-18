import React, { useEffect } from "react";
import { Map, Marker } from "react-kakao-maps";

const KakaoMap = ({ latitude, longitude }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=67e650846d198d753b8b983a63b09606`;
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      new window.kakao.maps.Map(container, options);
    };

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }} />;
};

export default KakaoMap;
