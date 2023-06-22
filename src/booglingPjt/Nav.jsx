import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = forwardRef(
  ({ signInedMember, userDB, realTimeSearch, setRealTimeSearch }, ref) => {
    const [loginedMember, setLoginedMember] = useState(""); // 현재 로그인한 회원 정보를 저장하는 상태 변수
    const [searchValue, setSearchValue] = useState(""); // 검색어를 저장하는 상태 변수
    const [selectedRegion, setSelectedRegion] = useState("00000"); // 선택된 지역을 저장하는 상태 변수

    useEffect(() => {
      console.log("[Nav] useEffect() CALLED!!");
    });

    const changeLoginMember = (signInedMember) => {
      // 로그인한 회원 정보 변경 함수
      console.log("[Nav] changeLoginMember() CALLED!!");
      console.log("[Nav] signInedMember.current", signInedMember.current);

      setLoginedMember(signInedMember.current);
    };

    // Nav의 changeLoginMember 함수를 하위에서 사용할 수 있게 하기 위함
    useImperativeHandle(ref, () => ({
      changeLoginMember,
    }));

    const signOutClickHandler = () => {
      // 로그아웃 버튼 클릭 이벤트 핸들러
      console.log("[Nav] signOutClickHandler() CALLED!!");

      signInedMember.current = "";
      setLoginedMember("");
    };

    const modifyAccountClickHandler = () => {
      console.log("[Nav] modifyAccountClickHandler() CALLED!!");
    };

    const regionChangeEventHendler = (e) => {
      // 지역 선택 변경 이벤트 핸들러
      console.log("[Nav] regionChangeEventHendler() CALLED!!");
      setSelectedRegion(e.target.value);
    };

    const navigate = useNavigate(); // 검색 버튼 클릭 이벤트 핸들러
    const clicked = () => {
      navigate("/search", {
        state: {
          region: selectedRegion,
          searchValue: searchValue,
        },
      });
      if (searchValue !== '') { //아파트명이 빈칸이 아니라면 실시간 검색내역 목록 추가
        realTimeSearch.push(searchValue) // 가져온 데이터를 목록에 추가
        let temp = realTimeSearch.slice();
        setRealTimeSearch(temp); // 목록 업데이트
      }
    };

    const handleInputChange = (e) => {
      // 검색어 입력 값 변경 이벤트 핸들러
      setSearchValue(e.target.value);
    };

    return (
      <nav>
        <div className="bar">
          <ul className="bar_ul">
            <li className="logo">
              <Link to="/">
                <img src="../imgs/부글링글자만.png" />
              </Link>
            </li>
            <li className="sign_up">
              {loginedMember === "" ? (
                <Link to="/user/sign_Up">회원가입</Link>
              ) : (
                <span>[Welcome {loginedMember}]</span>
              )}
            </li>
            <li className="sign_in">
              {loginedMember === "" ? (
                <Link to="/user/sign_in">로그인</Link>
              ) : (
                <Link to="/" onClick={signOutClickHandler}>
                  로그아웃
                </Link>
              )}
            </li>

            <li className="modify">
              {loginedMember === "" ? null : (
                <Link to="/user/modify" onClick={modifyAccountClickHandler}>
                  회원정보수정
                </Link>
              )}
            </li>

            <li className="btn" onClick={clicked}>
              <Link to="/search">찾기</Link>
            </li>

            <li
              className={
                searchValue == "" ? "region_settings" : "region_settings hidden"
              }
            >
              <span>지역설정</span>
              <select name="region" onChange={regionChangeEventHendler}>
                <option value="00000">지역설정</option>
                <option value="26320"> 북구</option>
                <option value="26350"> 해운대구</option>
                <option value="26380"> 사하구</option>
                <option value="26110"> 중구</option>
                <option value="26140"> 서구</option>
                <option value="26170"> 동구</option>
                <option value="26200"> 영도구</option>
                <option value="26230"> 부산진구</option>
                <option value="26260"> 동래구</option>
                <option value="26290"> 남구</option>
                <option value="26410"> 금정구</option>
                <option value="26440"> 강서구</option>
                <option value="26470"> 연제구</option>
                <option value="26500"> 수영구</option>
                <option value="26530"> 사상구</option>
                <option value="26710"> 기장군</option>
              </select>
            </li>

            <li
              className={
                selectedRegion == "00000" ? "apt_search" : "apt_search hidden"
              }
            >
              <span>검색&nbsp;</span>
              <input
                type="text"
                placeholder="아파트 명"
                value={searchValue}
                onChange={handleInputChange}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
);
export default Nav;
