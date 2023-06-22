import React from "react";
import { Link } from "react-router-dom";

const AptPriceRankMain = ({ item }) => {


    let apartNameAndPriceComposition;
    let apartNameAndPrice = [];

    // 아파트이름과 가격을 합친것을 배열로 만든다.
    if (item) {
        item.forEach(function (item) {
            item.forEach(function (item2) {
                apartNameAndPriceComposition = item2.아파트 + item2.거래금액;
                apartNameAndPrice.push(apartNameAndPriceComposition);

                // console.log("아파트 가격과 거래금액------>", apartNameAndPrice)
            });
        });
    }


    const resultArray = apartNameAndPrice.map((item) => {
        const [name, value] = item.split(/\s+\s+/); // 공백을 간격으로 숫자와 문자를 나눈다.
        return { name, value: parseInt(value.replace(",", "")) };
    }); // 현재 배열의 숫자를 뽑기위해 새로 map의 키밸류로 배열을 만든다.

    resultArray.sort((a, b) => b.value - a.value);

    return (
        <>
            {
                resultArray.map((item, idx) => (
                    idx <= 4 ?
                        <div className="apt_rankinglist">
                            <Link to={`/apt_detail/${item.name}`} >{item.name}</Link>
                            <br />
                            <span>{item.value.toLocaleString()}만</span>
                        </div>

                        : ""
                ))
            }

        </>
    );
}
export default AptPriceRankMain;