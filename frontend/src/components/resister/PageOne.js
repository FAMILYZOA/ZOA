import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin: 8px 0 8px;
  height: 88px;
`;

const Title = styled.p`
  font-size: 0.8em;
  margin: 0 0 4px 8px;
`;
const Warning = styled.p`
  font-size: 0.6em;
  margin: 4px 0 8px 8px;
  color: red;
  display: ${(props) => (props.active === false ? "none" : "block")};
`;
const Confirm = styled.p`
  font-size: 0.6em;
  margin: 4px 0 8px 8px;
  color: #3db9a4;
  display: ${(props) => (props.active === false ? "none" : "block")};
`;

const InputBox = styled.div`
  width: 90%;
  height: 44px;
  border-radius: 20px;
  border: solid 1px #ff787f;
  padding: 0 5%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
  height: 40px;
  border: none;
  background: none;
  font-size: 0.7em;
  outline: none;
`;
const CheckText = styled.p`
  font-size: 0.7em;
  font-weight: bold;
  margin: 0;
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

function PageOne({ oneInfo }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [certi, setCerti] = useState("");

  const [nameWarn, setNameWarn] = useState(false);
  const [phoneWarn, setPhoneWarn] = useState(false);
  const [certiWarn, setCertiWarn] = useState(false);

  const [send, setSend] = useState(false);
  const [check, setCheck] = useState(false);

  const [btnActive, setBtnActive] = useState(false);

  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  useEffect(() => {
    if (name === "") {
      setNameWarn(false);
    } else {
      if (name.length <= 1) {
        setNameWarn(true);
      } else {
        setNameWarn(false);
      }
    }
  }, [name]);
  const onChangePhone = (e) => {
    setPhone(
      e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };
  useEffect(() => {
    var regPhone = /^(010|011|016|017|018|019)-[0-9]{3,4}-[0-9]{4}$/;
    if (phone === "") {
      setPhoneWarn(false);
    } else {
      if (phone.length !== 13 || !regPhone.test(phone)) {
        setPhoneWarn(true);
      } else {
        setPhoneWarn(false);
      }
    }
  }, [phone]);
  const onChangeCerti = (e) => {
    setCerti(e.currentTarget.value);
  };

  const sendNum = (phone) => {
    if (phoneWarn === false) {
      setSend(true);
      const data = new FormData();
      data.append("phone", phone.replaceAll("-", ""));
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/event/`,
        data: data,
      });
    }
  };

  const checkNum = (certi) => {
    const data = new FormData();
    data.append("phone", phone.replaceAll("-", ""));
    data.append("certification", certi);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACK_HOST}/event/check/`,
      data: data,
    })
      .then((res) => {
        if (res.status === 200) {
          setCertiWarn(false);
          setCheck(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setCheck(false);
          setCertiWarn(true);
        } else if (err.response.status === 404) {
          setCheck(false);
          setCertiWarn(true);
        } else if (err.response.status === 429) {
          console.log("짧은 시간안에 너무 많은 요청을 보냈습니다.");
        } else if (err.response.status === 500) {
          console.log("server error");
        }
      });
  };

  useEffect(() => {
    if (
      nameWarn === false &&
      phoneWarn === false &&
      certiWarn === false &&
      check === true
    ) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [nameWarn, phoneWarn, certiWarn, check]);
  const nextBtn = () => {
    if (
      nameWarn === false &&
      phoneWarn === false &&
      certiWarn === false &&
      check === true
    ) {
      oneInfo({
        phone: phone.replaceAll("-", ""),
        name: name,
      });
    }
  };

  return (
    <div>
      <Container>
        <Title>이름</Title>
        <InputBox>
          <Input
            type="text"
            placeholder="이름 입력"
            maxLength="10"
            minLength="2"
            onChange={onChangeName}
            value={name}
          ></Input>
        </InputBox>
        <Warning active={nameWarn}>이름을 입력해주세요.</Warning>
      </Container>

      <Container>
        <Title>휴대폰번호</Title>
        <InputBox>
          <Input
            type="tel"
            placeholder="휴대폰 11자리"
            maxLength="13"
            onChange={onChangePhone}
            value={phone}
          ></Input>
          <CheckText onClick={() => sendNum(phone)}>인증번호 받기</CheckText>
        </InputBox>
        <Warning active={phoneWarn}>휴대폰 번호를 확인해주세요.</Warning>
        <Confirm active={send}>인증번호를 전송하였습니다.</Confirm>
      </Container>

      <Container>
        <Title>인증번호</Title>
        <InputBox>
          <Input
            type="text"
            placeholder="인증 번호 입력"
            onChange={onChangeCerti}
            value={certi}
          ></Input>
          <CheckText
            onClick={() => {
              checkNum(certi);
            }}
          >
            확인
          </CheckText>
        </InputBox>
        <Warning active={certiWarn}>인증번호가 잘못되었습니다.</Warning>
        <Confirm active={check}>인증번호가 확인되었습니다.</Confirm>
      </Container>
      <BtnBox>
        <Btn onClick={nextBtn} active={btnActive}>
          다음
        </Btn>
      </BtnBox>
    </div>
  );
}

export default PageOne;
