import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageOne from "../../components/resister/PageOne";
import PageTwo from "../../components/resister/PageTwo";

const Container = styled.div`
  margin: 10% 5%;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 56px auto;
`;
const Btn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: linear-gradient(45deg, #fec786, #fe9b7c);
  border: none;
  border-radius: 30px;
  font-weight: bold;
  color: white;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
`;


function Resister() {
  const [btnActive, setBtnActive] = useState(false);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    phone: "",
    password: "",
    name: "",
    birth: "",
  });
  const [next, setNext] = useState(false);
  const oneInfo = (data) => {
    setInfo((pre) => {
      return { ...pre, phone: data.phone, name: data.name };
    });
  };
  const twoInfo = (data) => {
    setInfo((pre) => {
      return { ...pre, password: data.password, birth: data.birth };
    });
  };
  useEffect(() => {
    if (info.phone.length === 11 && info.name.length > 0) {
    }
  }, [info]);
  const activeBtn = (data) => {
    setBtnActive(data.active);
  }

  const nextBtn = () => {
        const data = new FormData();
        data.append("phone", info.phone);
        data.append("password", info.password);
        data.append("name", info.name);
        data.append("birth", info.birth);
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          url: `${process.env.REACT_APP_BACK_HOST}/accounts/signup/`,
          data: data,
        })
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              alert("회원가입에 성공하였습니다. 로그인 후 이용해주세요.");
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 400) {
              alert("이미 가입된 회원입니다. 로그인 후 이용해주세요.");
              navigate("/intro");
            }
          });
  };
  return (
    <div>
      <Header label="회원가입" back="true"></Header>
      <Container>
        {next === false ? (
          <PageOne oneInfo={oneInfo}></PageOne>
        ) : (
          <>
            <PageTwo twoInfo={twoInfo} activeBtn={activeBtn}></PageTwo>
            <BtnBox>
              <Btn onClick={nextBtn} active={btnActive}>
                회원가입
              </Btn>
            </BtnBox>
          </>
        )}
      </Container>
    </div>
  );
}

export default Resister;
