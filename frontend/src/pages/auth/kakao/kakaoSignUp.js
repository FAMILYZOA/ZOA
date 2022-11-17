import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/white-logo.png";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 4px;
  img {
    height: 32px;
  }
`;

const Container = styled.div`
  margin: 20% 5%;
`;

const Info = styled.p`
  margin: 64px 0;
  font-size: 16px;
`;

const InputBox = styled.div`
  margin: 32px 0;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0 0 8px 8px;
`;
const Warning = styled.p`
  font-size: 12px;
  margin: 4px 0 8px 8px;
  color: red;
  display: ${(props) => (props.active == false ? "none" : "block")};
`;
const Confirm = styled.p`
  font-size: 12px;
  margin: 4px 0 8px 8px;
  color: #3db9a4;
  display: ${(props) => (props.active == false ? "none" : "block")};
`;
const PhoneInputBox = styled.div`
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

const PhoneInput = styled.input`
  width: 60%;
  height: 40px;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
`;
const CheckText = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const AgeSelectors = styled.div`
  margin: 8px 0;
  width: 100%;
`;

const AgeSelector = styled.select`
  width: 30%;
  height: 44px;

  margin-left: 2%;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 20px */

  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;

  text-align: center;
  color: #707070;

  background: #ffffff;
  border: 1px solid #ff787f;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
  padding: 4px;
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
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

function KakaoSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const preinfo = location.state;
  const [info, setInfo] = useState({
    kakao_id: String(preinfo.id),
    name: preinfo.name,
    image: preinfo.profile,
    phone: "",
    birth: "",
  });

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phone, setPhone] = useState("");
  const [yearArr, setYearArr] = useState([]);
  const [monthArr, setMonthArr] = useState([]);
  const [dayArr, setDayArr] = useState([]);

  useEffect(() => {
    const tempArr = [];
    for (let y = 2022; y > 1920; y--) {
      tempArr.push(y);
    }
    setYearArr(tempArr);
  }, []);

  useEffect(() => {
    if (year) {
      const tempArr = [];
      for (let m = 1; m <= 12; m++) {
        tempArr.push(m);
      }
      setMonthArr(tempArr);
    }
  }, [year]);

  useEffect(() => {
    if (year && month) {
      const tempArr = [];
      switch (month) {
        case "1":
        case "3":
        case "5":
        case "7":
        case "8":
        case "10":
        case "12":
          for (let d = 1; d <= 31; d++) {
            tempArr.push(d);
          }
          break;
        case "2":
          if (leapYear(year)) {
            for (let d = 1; d <= 29; d++) {
              tempArr.push(d);
            }
          } else {
            for (let d = 1; d <= 28; d++) {
              tempArr.push(d);
            }
          }
          break;
        default:
          for (let d = 1; d <= 30; d++) {
            tempArr.push(d);
          }
          break;
      }
      setDayArr(tempArr);
    }
  }, [year, month]);

  const leapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const onPhoneChange = (e) => {
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
      setPwarn(false);
      setPhoneCheckWarn(false);
    } else {
      if (phone.length !== 13 || !regPhone.test(phone)) {
        setPwarn(true);
        setPhoneCheckWarn(false);
      } else {
        setPhoneCheckWarn(false);
        setPwarn(false);
      }
    }
    if (phone.length === 13) {
      setInfo((pre) => {
        return {
          ...pre,
          phone: phone,
        };
      });
    } else {
      setInfo((pre) => {
        return { ...pre, phone: "" };
      });
    }
  }, [phone]);
  const onCertChange = (e) => {
    setNum(e.currentTarget.value);
  };

  const selectYear = (e) => {
    setYear(e.target.value);
  };
  const selectMonth = (e) => {
    setMonth(e.target.value);
  };
  const selectDay = (e) => {
    setDay(e.target.value);
  };
  const [disphone, setDisphone] = useState(false);
  const [pwarn, setPwarn] = useState(false);
  const [phoneCheckWarn, setPhoneCheckWarn] = useState(false);
  const [bwarn, setBwarn] = useState(false);
  const [nwarn, setNwarn] = useState(false);
  const [nconfirm, setNconfirm] = useState(false);
  const [cconfirm, setCconfirm] = useState(false);
  // 유저가 입력한 인증번호
  const [certifiNum, setNum] = useState("");
  // 인증 성공 여부
  const [cerCheck, setCheck] = useState(false);

  const pushNum = (phone) => {
    if (pwarn === false) {
      const data = new FormData();
      data.append("phone", phone.replaceAll("-", ""));
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/accounts/phonecheck/`,
        data: data,
      })
        .then((res) => {
          if (res.status === 200) {
            setNconfirm(true);
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_BACK_HOST}/event/`,
              data: data,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setPwarn(false);
            setNconfirm(false);
            setPhoneCheckWarn(true);
          }
        });
    }
  };

  const clickCheck = (certifiNum) => {
    console.log(disphone);
    const data = new FormData();
    data.append("phone", phone.replaceAll("-", ""));
    data.append("certification", certifiNum);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACK_HOST}/event/check/`,
      data: data,
    })
      .then((res) => {
        if (res.status === 200) {
          setNwarn(false);
          setCconfirm(true);
          setCheck(true);
          setDisphone(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setCconfirm(false);
          setNwarn(true);
        } else if (err.response.status === 404) {
          setCconfirm(false);
          setNwarn(true);
        }
      });
  };


  const push = () => {
    if (cerCheck === false) {
      setNwarn(true);
    } else {
      if (info.phone === "") {
        setNconfirm(false);
        setPwarn(true);
      } else if (year === "" || month === "" || day === "") {
        setPwarn(false);
        setBwarn(true);
      } else {
          const data = new FormData();
          data.append("kakao_id", info.kakao_id);
          data.append("name", info.name);
          data.append("image", info.image);
          data.append("phone", info.phone.replaceAll("-", ""));
          data.append(
            "birth",
            `${year}-${("00" + month.toString()).slice(-2)}-${("00" + day.toString()).slice(-2)}`
          );
          axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACK_HOST}/accounts/kakao/sign/`,
            data: data,
          })
            .then((res) => {
              if (res.status === 201) {
                alert("회원가입이 완료되었습니다. 로그인 후 이용해주세요.");
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 400) {
                alert("이미 가입된 회원입니다. 로그인을 해주세요.");
                navigate("/intro");
              }
            });
        }
      }
    }

  return (
    <div>
      <Header>
        <img src={logo} alt="" />
      </Header>
      <Container>
        <Info>추가 정보를 입력해주세요🙂</Info>
        <InputBox>
          <Title>휴대폰 번호</Title>
          <PhoneInputBox>
            <PhoneInput
              type="tel"
              placeholder="휴대폰 11자리"
              maxLength="13"
              onChange={onPhoneChange}
              value={phone}
              disabled = {disphone}
            ></PhoneInput>
            <CheckText onClick={() => pushNum(phone)}>인증번호 받기</CheckText>
          </PhoneInputBox>
          <Warning active={pwarn}>휴대폰 번호를 확인해주세요.</Warning>
          <Warning active={phoneCheckWarn}>이미 가입된 번호입니다.</Warning>
          <Confirm active={nconfirm}>인증번호를 전송하였습니다.</Confirm>
        </InputBox>
        <InputBox>
          <Title>인증번호</Title>
          <PhoneInputBox>
            <PhoneInput
              type="text"
              placeholder="인증 번호 입력"
              maxLength="6"
              onChange={onCertChange}
              value={certifiNum}
            ></PhoneInput>
            <CheckText onClick={() => clickCheck(certifiNum)}>확인</CheckText>
          </PhoneInputBox>
          <Warning active={nwarn}>인증번호가 잘못되었습니다.</Warning>
          <Confirm active={cconfirm}>인증번호가 확인되었습니다.</Confirm>
        </InputBox>
        <InputBox>
          <Title>생년월일</Title>
          <AgeSelectors>
            <AgeSelector onChange={selectYear}>
              <option value="">연도</option>
              {yearArr.map((y) => {
                return <option value={y.toString()}>{y}년</option>;
              })}
            </AgeSelector>
            <AgeSelector onChange={selectMonth}>
              <option value="">월</option>
              {monthArr.map((m) => {
                return <option value={m.toString()}>{m}월</option>;
              })}
            </AgeSelector>
            <AgeSelector onChange={selectDay}>
              <option value="">일</option>
              {dayArr.map((d) => {
                return <option value={d.toString()}>{d}일</option>;
              })}
            </AgeSelector>
          </AgeSelectors>
          <Warning active={bwarn}>생년월일을 확인해주세요.</Warning>
        </InputBox>
        <BtnBox>
          <Btn onClick={push}>회원가입</Btn>
        </BtnBox>
      </Container>
    </div>
  );
}

export default KakaoSignup;
