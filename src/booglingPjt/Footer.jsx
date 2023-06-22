import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        <span>{`좋은데2팀 (이순민, 김진범, 이은지, 이유빈) | `}</span>
        <Link
          to="https://github.com/BTC-LeeSoonMin/boogling_pjt.git"
          target="_blank"
        >
          Github
        </Link>
        <br />
        <span>{`Copyright 2023. 좋은데2팀. All rights reserved.`}</span>
      </div>
    </footer>
  );
};

export default Footer;
