import React, { useState, useEffect } from "react";
import "./css/signIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = ({ userDB, signInedMember, setLoginedSession }) => {
  const [m_id, setM_id] = useState("");
  const [m_pw, setM_pw] = useState("");

  useEffect(() => {
    console.log("[UserSignIn] useEffect() CALLED!!");
  });

  const navigate = useNavigate();

  // HANDLER START
  const ClickedBtnHandler = (e) => {
    console.log("[SignIn] ClickedBtnHandler() CALLED!!");
    // const U_id = userDB.get(m_id).m_mail;
    // const U_pw = userDB.get(m_id).m_pw;
    console.log("m_id: ", userDB.get(m_id));

    // 로그인한 아이디와 비밀번호가 입력한 비밀번호와 일치할 때 로그인
    if (userDB.has(m_id) && userDB.get(m_id).m_pw === m_pw) {
      console.log("[UserSignIn] SIGN-IN SUCCESS!!");

      // alert("SIGN-IN SUCCESS!!");

      signInedMember.current = m_id;
      setLoginedSession();

      navigate("/"); // 로그인시 메인 페이지로 이동
    } else if (m_id == "" && m_pw == "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else if (!userDB.has(m_id)) {
      console.log("[UserSignIn] SIGN-IN FAIL!!");
      // console.log("m_id : ", m_id);
      // console.log("U_id : ", U_id);
      setM_id("");
      setM_pw("");
      return alert("아이디가 일치하지 않습니다.");
    } else {
      console.log("[UserSignIn] SIGN-IN FAIL!!");

      setM_id("");
      setM_pw("");
      return alert("비밀번호가 일치하지 않습니다.");
    }
  };
  // HANDLER END

  return (
    <section>
      <div class="section_wrap">
        <div class="sign_in">
          <div className="sign_in_title">
            <span>로그인</span>
          </div>
          <input
            type="text"
            name="m_id"
            placeholder="ID"
            value={m_id}
            onChange={(e) => {
              setM_id(e.target.value);
            }}
          />
          <br />
          <input
            type="password"
            name="m_pw"
            placeholder="PASSWORD"
            value={m_pw}
            onChange={(e) => {
              setM_pw(e.target.value);
            }}
          />
          <br />
          <input type="button" value="Login" onClick={ClickedBtnHandler} />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
