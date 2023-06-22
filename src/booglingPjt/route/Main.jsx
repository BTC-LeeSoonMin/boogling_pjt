import React, { useEffect, useState } from "react";
import KakaoMapMain from "../KakaoMapMain";
import { Link, useNavigate } from "react-router-dom";
import "./css/main.css";
import AptPriceRank from "./AptPriceRank";
import AptRisingRank from "./AptRisingRank";
import FavoritesList from "../FavoritesList";

const Main = ({ item, realTimeSearch, userDB, signInedMember }) => {
  // console.log("item ", item)
  console.log("[Main]realTimeSearch ", realTimeSearch);
  return (
    <main>
      <div className="main">
        <ul className="main_ul">
          <li className="view">
            {item.length !== 0 ? <AptPriceRank item={item} /> : null}

            <div className="apt_top1">
              {item.length !== 0 ? <AptRisingRank item={item} /> : null}
            </div>
          </li>

          <li className="map">
            {item.length !== 0 ? <KakaoMapMain item={item} /> : null}
          </li>

          <li className="view">
            {item.length !== 0 ?
              <FavoritesList item={item} userDB={userDB} signInedMember={signInedMember} />
              : null}
            <div className="real_time_search">
              <div className="real_time_search_title">나의 검색 내역</div>
              <div className="real_time_search_main">
                {realTimeSearch != "" ? (
                  realTimeSearch.map((element) => {
                    return (
                      <div>
                        <a href="#none">{element}</a>
                      </div>
                    );
                  })
                ) : (
                  <div>검색내역 없음</div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};
export default Main;