import React, { useEffect } from "react";

const { kakao } = window;

const KakaoMapDetail = ({ AptFilteredArray }) => {
  let apartComposition;
  const addressName = [];

  // AptFilteredArray가 존재한다면 배열을 순회하며 addressName 배열에 apartComposition(주소)를 추가
  // apartComposition 변수에 주소 할당
  if (AptFilteredArray) {
    AptFilteredArray.forEach(function (item) {
      AptFilteredArray.forEach(function (item2) {
        apartComposition =
          "부산광역시 " +
          "\t" +
          AptFilteredArray[0].AptAdress +
          "\t" +
          AptFilteredArray[0].AptName;
        addressName.push(apartComposition);
      });
    });
  }
  console.log("AptFilteredArray", AptFilteredArray);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(35.13417, 129.11397), // Set the desired center coordinates for Busan
      level: 3,
    };

    // 지도를 생성한다.
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // var data = [
    //   [
    //     35.156005,
    //     129.059799,
    //     '<div style="padding:5px;">내용1 </div>',
    //     35.156005,
    //     129.059799,
    //     '<div style="padding:5px;">내용2 </div>',
    //     35.156005,
    //     129.059799,
    //     '<div style="padding:5px;">내용3 </div>',
    //   ],
    // ];

    // var markers = [];
    // for (var i = 0; i < data.length; i++) {
    // 지도에 마커를 생성하고 표시한다.
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(35.156005, 129.059799),
      map: map, // 마커를 표시할 지도 객체
    });

    // var iwContent = '<div style="padding:5px;">내용 </div>';

    // // 인포윈도우를 생성합니다
    // var infowindow = new kakao.maps.InfoWindow({
    //   // position: iwPosition,
    //   content: iwContent,
    // });

    // // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    // infowindow.open(map, marker);

    const geocoder = new kakao.maps.services.Geocoder();

    // 마커에 마우스 이벤트 리스너 추가
    const addMarkerMouseEvents = (marker, infowindow) => {
      // 마우스를 올렸을 때 정보 창 열기
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });

      // 마우스를 뗄 때 정보 창 닫기
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
    };

    // 주소 검색
    const searchAddress = (address) => {
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우를 생성합니다. content: 표시할 내용 html 형식으로 지정합니다.
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${addressName[0]}</div>`,
          });

          // 마커에 마우스 이벤트 리스너 추가
          addMarkerMouseEvents(marker, infowindow);

          // 지도의 중심을 coords 좌표로 이동합니다.
          map.setCenter(coords);

          // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다.
          infowindow.open(map, marker);

          // 지도의 중심을 coords 좌표로 이동합니다.
          map.setCenter(coords);
        }
      });
    };

    // for문을 통해 addressName 배열의 각 주소에 대해 searchAddress 함수를 호출합니다.
    // addressName 배열에 저장된 각 주소에 대해 지도에 마커와 인포윈도우를 표시하게 됩니다.
    for (let i = 0; i < addressName.length; i++) {
      searchAddress(addressName[i]);
    }

    // 컴포넌트가 unmount될 때 지도 객체 제거
    return () => {
      kakao.maps.event.removeListener(map, "bounds_changed");
    };
  }, [addressName]);

  return <li id="map" style={{ width: "500px", height: "650px" }}></li>;
};

export default KakaoMapDetail;
