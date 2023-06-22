import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="./imgs/부글링글자만.png" />
        </Link>
      </div>
    </header>
  );
};
export default Header;