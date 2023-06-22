import React from "react";
import { Link } from "react-router-dom";
const AptRisingRankMain = ({ item }) => {
    let apartNameAndPriceComposition2022;
    let apartNameAndPrice2022 = [];

    let apartNameAndPriceComposition2023;
    let apartNameAndPrice2023 = [];

    console.log("***Risingitem------------->****", item);
    if (item) {
        item.forEach(function (item) {
            item.forEach(function (item2) {
                if (item2.년 === 2022) {
                    apartNameAndPriceComposition2022 = "부산광역시" + item2.도로명 + item2.도로명건물본번호코드 + " " + item2.아파트 + " " + item2.층 + "층" + " " + item2.전용면적 + item2.거래금액;
                    apartNameAndPrice2022.push(apartNameAndPriceComposition2022);
                }
                else if (item2.년 === 2023) {
                    apartNameAndPriceComposition2023 = "부산광역시" + item2.도로명 + item2.도로명건물본번호코드 + " " + item2.아파트 + " " + item2.층 + "층" + " " + item2.전용면적 + item2.거래금액;
                    apartNameAndPrice2023.push(apartNameAndPriceComposition2023);
                }
                // console.log("아파트 가격과 거래금액------>", apartNameAndPrice)
            });
        });
    }

    console.log("2022 나눠진것**********", apartNameAndPrice2022);
    console.log("2023 나눠진것**********", apartNameAndPrice2023);





    const resultArray2022 = apartNameAndPrice2022.map(item => {
        const [name, value] = item.split(/\s+\s+/); // 공백을 간격으로 숫자와 문자를 나눈다.
        return { name, value: parseInt(value.replace(',', '')) };
    }); // 현재 배열의 숫자를 뽑기위해 새로 map의 키밸류로 배열을 만든다.

    const resultArray2023 = apartNameAndPrice2023.map(item => {
        const [name, value] = item.split(/\s+\s+/); // 공백을 간격으로 숫자와 문자를 나눈다.
        return { name, value: parseInt(value.replace(',', '')) };
    }); // 현재 배열의 숫자를 뽑기위해 새로 map의 키밸류로 배열을 만든다.

    console.log("resultArray2022---------------->", resultArray2022);
    console.log("resultArray2023---------------->", resultArray2023);


    let AptRisingNameAndPrice = resultArray2023.map(function (item1) {
        var matchingItem = resultArray2022.find(function (item2) {
            return item2.name === item1.name;
        });

        if (matchingItem) {
            let diffPercent = Number((((item1.value - matchingItem.value) / item1.value) * 100).toFixed(2));
            return {
                name: item1.name,
                diffPercent: diffPercent + "%",
                value: item1.value - matchingItem.value
            };
        } else {
            return null; // key가 일치하는 항목이 없을 경우
        }
    }).filter(function (value) {
        return value !== null; // null 값을 필터링하여 제외
    });


    console.log("최종 금액 표시--------", AptRisingNameAndPrice);


    let SortedAptRisingNameAndPrice = AptRisingNameAndPrice.sort((a, b) => {
        // 절대값으로 비교하기 위해 Math.abs() 함수를 사용합니다.
        const diffPercentA = Math.abs(parseFloat(a.diffPercent));
        const diffPercentB = Math.abs(parseFloat(b.diffPercent));

        // 내림차순으로 정렬하기 위해 b - a를 반환합니다.
        return diffPercentB - diffPercentA;
    });


    // AptRisingNameAndPrice.map(num => ({ value: num, absoluteValue: Math.abs(num) }));
    // AptRisingNameAndPrice.sort((a, b) => Math.abs(b.diffPercent) - Math.abs(a.diffPercent));
    // AptRisingNameAndPrice.sort((a, b) => b.absoluteValue - a.absoluteValue);




    console.log("아파트 가격 차이 정렬된 것------------->", AptRisingNameAndPrice);

    const AptRisingNameAndPriceResult = SortedAptRisingNameAndPrice.map(item => {
        const splitName = item.name.split(' ');
        const name = splitName.slice(1).join(' ');
        const diffPercent = item.diffPercent;
        const value = item.value;
        return { name, diffPercent, value };
    });

    console.log("잘라낸 결과-------------->", AptRisingNameAndPriceResult);

    // apartPrice2022 = resultArray2022.map(item => item.value);
    // console.log("2022년 가격모음------------>", apartPrice2022);

    return (
        <div>

            {
                AptRisingNameAndPriceResult.map((item, idx) => (
                    idx <= 4 ?
                        <div className="apt_rankingRisinglist">
                            <span>{item.name}m<sup>2</sup></span>
                            <ul>

                                <li>
                                    {item.value < 0 ? <p className="decrease">하락</p> : <p className="increase">상승</p>}
                                </li>
                                <li>
                                    <span>{item.diffPercent} </span>
                                </li>
                                <li>
                                    <span>{item.value.toLocaleString()}만</span>
                                </li>
                            </ul>
                        </div>
                        : ""
                ))
            }
        </div>
    );
}
export default AptRisingRankMain;