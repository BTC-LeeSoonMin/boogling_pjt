import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Favorites = ({ userDB, setUserDB, signInedMember, item }) => {
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const [m_favoriteApt, setM_favoriteApt] = useState("");
  const [m_mail, setM_mail] = useState("");
  const [loginedMember, setloginedMember] = useState("");
  const [localDataList, setLocalDataList] = useState([]);

  // console.log("--999999999999999", m_mail)

  // console.log("member----------", member);
  useEffect(() => {
    if (signInedMember.current !== "") {
      const member = userDB.get(signInedMember.current);
      setloginedMember(member);
      setM_mail(member.m_mail);

      // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터를 가져옴
      localStorage.getItem(member.m_mail);
      const dataArray = JSON.parse(localStorage.getItem(member.m_mail));
      JSON.stringify(dataArray);
      localStorage.setItem(member.m_mail, JSON.stringify(dataArray));
      setLocalDataList(dataArray);
    }
  }, []);

  // let member = userDB.get(signInedMember.current);

  return (
    <>
      {localDataList !== '' ?
        (localDataList.map((item, idx) =>
          idx <= 7 ? (
            <div className="wishlist_main">
              <div>
                <Link to={`/apt_detail/${item}`}>{item}</Link>
              </div>
            </div>
          ) : (
            ""
          )
        )) : (
          <div>즐겨찾기 없음</div>
        )}
    </>
  );
};

export default Favorites;
