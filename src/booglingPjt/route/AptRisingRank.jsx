import React from "react";
import AptRisingRankMain from "../AptRisingRankMain";

const AptRisingRank = ({ item }) => {
  return (
    <div className="apt_top">
      <div className="apt_top_title">가격변동 Best5</div>
      <div className="apt_top_main">
        <AptRisingRankMain item={item} />
      </div>
    </div>
  );
};
export default AptRisingRank;
