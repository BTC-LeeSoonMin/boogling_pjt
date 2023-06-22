import React, { useEffect, useState } from "react";
import LikeBtn from "./LikeBtn";
import { Link } from "react-router-dom";
import Favorites from "./route/Favorites";

const FavoritesList = ({ userDB, setUserDB, signInedMember, item }) => {
    const [favoritesArray, setFavoritesArray] = useState([]);
    const [favoriteListBtn, setFavoriteListBtn] = useState(false);

    return (
        <div className="wishlist">
            <div className="wishlist_title">
                즐겨찾기
            </div>
            <Favorites item={item} userDB={userDB} signInedMember={signInedMember} />
        </div>
    );
};

export default FavoritesList;
