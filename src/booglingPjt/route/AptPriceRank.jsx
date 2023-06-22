import React from "react";
import { Link } from "react-router-dom";
import AptPriceRankMain from "../AptPriceRankMain";
const AptPriceRank = ({ item, setAptInfo }) => {
  return (
    <div className="apt_ranking">
      <div className="apt_ranking_title">실거래가 Best 5</div>
      <div className="apt_ranking_main">
        <AptPriceRankMain item={item} setAptInfo={setAptInfo} />
      </div>
    </div>
  );
};
export default AptPriceRank;
