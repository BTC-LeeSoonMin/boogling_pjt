import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { kakao } = window;
// import { useNavigate } from "react-router-dom";
// import AptDetail from "./route/AptDetail";

const KakaoMapMain = ({ item }) => {
  let apartComposition;
  let apartNameComposition;
  // const history = useHistory();
  const addressName = [];
  const apartName = [];
  const navigate = useNavigate();
  // console.log("---------->", item);


  if (item) {
    item.forEach(function (item) {
      item.forEach(function (item2) {
        apartComposition =
          "부산광역시" +
          item2.도로명 +
          item2.도로명건물본번호코드 +
          " " +
          item2.아파트;
        addressName.push(apartComposition);
        // console.log("아파트 가격과 거래금액------>", apartNameAndPrice)
      });
    });
  }

  if (item) {
    item.forEach(function (item) {
      item.forEach(function (item2) {
        apartNameComposition =
          item2.아파트;
        apartName.push(apartNameComposition);
        // console.log("아파트 가격과 거래금액------>", apartNameAndPrice)
      });
    });
  }

  // console.log("--------> ")

  useEffect(() => {
    var mapContainer = document.getElementById("map"); // 지도를 표시할 div
    var mapOption = {
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // 지도의 중심좌표

      level: 8, // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      // averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
    });

    // 마커에 마우스 이벤트 리스너 추가
    // const addMarkerMouseEvents = (marker, infowindow) => {
    //   // 마우스를 올렸을 때 정보 창 열기
    //   kakao.maps.event.addListener(marker, "click", function () {
    //     infowindow.open(map, marker);
    //     for (let i = 0; i < addressName.length; i++) {
    //       return navigate(`/apt_detail/${addressName[i].}`);
    //     }
    //     // window.location.href = `/apt_detail/${apartName[i]}`;

    //     // history.push(`/apt_detail/${item}`)
    //   });

    //   // 마우스를 뗄 때 정보 창 닫기
    //   kakao.maps.event.addListener(marker, "mouseout", function () {
    //     infowindow.close();
    //   });
    // };

    let geocoder = new kakao.maps.services.Geocoder();

    for (let i = 0; i < addressName.length; i++) {
      // console.log("두번째-------------->", );
      // let arr=addressName[i]
      geocoder.addressSearch(addressName[i], function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${addressName[i]}</div>`,
            // content: `<Link to=/apt_detail/${addressName[i]}><div style="width:150px;text-align:center;padding:6px 0;">${addressName[i]}</div></Link>`,
          });
          // console.log("두번째-------------->", apartName[i]);
          // 마커에 마우스 이벤트 리스너 추가
          const addMarkerMouseEvents = (marker, infowindow) => {
            // 마우스를 올렸을 때 정보 창 열기

            kakao.maps.event.addListener(marker, "mouseover", function () {
              infowindow.open(map, marker);
            });

            kakao.maps.event.addListener(marker, "click", function () {
              return navigate(`/apt_detail/${apartName[i]}`);

            });

            // 마우스를 뗄 때 정보 창 닫기
            kakao.maps.event.addListener(marker, "mouseout", function () {
              infowindow.close();
            });
          };
          addMarkerMouseEvents(marker, infowindow);

          // clusterer.addMarker(marker); // 클러스터에 마커 추가

          // 지도의 중심을 coords 좌표로 이동합니다.
          // map.setCenter(coords);

          // infowindow.open(map, marker);
          // map.setCenter(coords);
        }
      });
    }
    // if (addressName.length > 0) {
    //   // 첫 번째 마커의 좌표로 지도의 중심을 설정합니다.
    //   geocoder.addressSearch(addressName[0], function (result, status) {
    //     if (status === kakao.maps.services.Status.OK) {
    //       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //       map.panTo(coords); // 지도의 중심을 해당 마커 위치로 이동합니다.
    //     }
    //   });
    // }
  }, [addressName]);

  return <li id="map" style={{ width: "1000px", height: "725px" }}></li>;
};

export default KakaoMapMain;