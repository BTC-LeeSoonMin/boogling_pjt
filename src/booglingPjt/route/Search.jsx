import React, { useEffect, useState } from "react";
import "./css/search.css";
import "./css/common.css";
import SearchList from "./SearchList";
import { useLocation } from "react-router-dom";
import Paging from "../Paging";

const Search = ({ item }) => {
  const location = useLocation();
  let region = location.state.region; // [Nav] URL에서 전달된 지역 정보
  let searchValue = location.state.searchValue; // [Nav] URL에서 전달된 검색어

  // console.log('[Search] location.state----> ', location.state);
  // console.log('[Search] item =====> ', item)

  const [AptOriginalArray, setAptOriginalArray] = useState([]);
  const [AptFilteredArray, setAptFilteredArray] = useState([]); //리스트에 나타낼 아이템
  // console.log('[Search] AptFilteredArray:', AptFilteredArray)

  const [currentPosts, setCurrentPosts] = useState([]); //보여줄 포스트
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [page, setPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(5); //페이지당 포스트 개수
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  useEffect(() => {
    // 원본 데이터인 item을 분해해서 원하는 형태로 AptOriginalArray에 담기
    // let AptOriginalArray = []
    console.log("currentPosts : ", currentPosts);
    AptOriginalArray.splice(0);
    item.forEach(function (item) {
      item.forEach(function (item2) {
        AptOriginalArray.push({
          AptName: item2.아파트,
          AptAdress: item2.도로명 + item2.도로명건물본번호코드,
          AptPrice: item2.거래금액,
          AptArea: item2.전용면적,
          AptFloor: item2.층,
          AptRegion: item2.지역코드,
        });
      });
    });

    // 검색어로 필터링된 아파트 목록 생성
    // AptOriginalArray을 분해해서 "[Nav] URL에서 전달된 검색어" 와 일치하는 데이터만 AptFilteredArray에 push
    // let AptFilteredArray = [];
    if (searchValue != "") {
      const filteredsearchValue = AptOriginalArray.filter(
        (ele) => ele.AptName == searchValue
      );
      console.log("[Search] filteredsearchValue: ", filteredsearchValue);

      AptFilteredArray.splice(0);
      console.log("----> ", AptFilteredArray.length);
      filteredsearchValue.forEach(function (filteredsearchValue) {
        AptFilteredArray.push({
          AptName: filteredsearchValue.AptName,
          AptAdress: filteredsearchValue.AptAdress,
          AptPrice: filteredsearchValue.AptPrice,
          AptArea: filteredsearchValue.AptArea,
          AptFloor: filteredsearchValue.AptFloor,
          AptRegion: filteredsearchValue.AptRegion,
        });
      });
      console.log(">>>>> ", AptFilteredArray.length);
    } else if (region != "00000") {
      // 지역 코드로 필터링된 아파트 목록 생성
      // AptOriginalArray을 분해해서 "[Nav] URL에서 전달된 지역 정보" 와 일치하는 데이터만 AptFilteredArray에 push
      const filteredregion = AptOriginalArray.filter(
        (ele) => ele.AptRegion == region
      );
      console.log("filteredregion =====> ", filteredregion.length);
      // console.log('[Search] filteredregion: ', filteredregion)
      AptFilteredArray.splice(0);
      console.log("----> ", AptFilteredArray.length);
      console.log("filteredregion ----> ", filteredregion);
      filteredregion.forEach(function (filteredregion) {
        console.log("+");
        AptFilteredArray.push({
          AptName: filteredregion.AptName,
          AptAdress: filteredregion.AptAdress,
          AptPrice: filteredregion.AptPrice,
          AptArea: filteredregion.AptArea,
          AptFloor: filteredregion.AptFloor,
          AptRegion: filteredregion.AptRegion,
        });
      });
      console.log("<<<<< AptFilteredArray ", AptFilteredArray);
    }

    console.log("[Search] AptFilteredArray.length", AptFilteredArray.length);

    setCurrentPosts(AptFilteredArray.slice(indexOfFirstPost, indexOfLastPost));
  }, [region, searchValue, indexOfFirstPost, indexOfLastPost, page]);

  return (
    <section>
      <div className="search_main">
        <div className="search_title">검색결과</div>
        <div className="search_list">
          <ul className="list_name">
            <li>아파트</li>
            <li>주소</li>
            <li>거래가격</li>
            <li className="area">면적</li>
            <li className="floor">층수</li>
          </ul>

          {currentPosts.map((ele, idx) => {
            return (
              <SearchList
                key={idx}
                AptName={ele.AptName}
                AptAdress={ele.AptAdress}
                AptPrice={ele.AptPrice}
                AptArea={ele.AptArea}
                AptFloor={ele.AptFloor}
              />
            );
          })}
        </div>

        <div className="page">
          <Paging
            totalCount={AptFilteredArray.length}
            page={page}
            postPerPage={postPerPage}
            handlePageChange={handlePageChange}
            pageRangeDisplayed={5}
            setPage={setPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Search;
