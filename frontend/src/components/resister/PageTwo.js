import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px 0 8px;
  height: 88px;
`;
const PwContainer = styled.div`
  margin: 16px 0;
  height: 120px;
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
const PwInfo = styled.p`
  font-size: 0.6em;
  margin: 4px 0 0px 8px;
  color: #707070;
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
  width: 100%;
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

const AgeSelectors = styled.div`
  margin: 8px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const AgeSelector = styled.select`
  width: 32.5%;
  height: 44px;

  /* margin-left: 2%; */

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8em;
  line-height: 100%;
  /* or 20px */

  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;

  text-align: center;
  color: #707070;

  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #ff787f;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
  padding: 4px;
`;


function PageTwo({ twoInfo, activeBtn }) {
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [pwWarn, setPwWarn] = useState(false);
  const [confirmPwWarn, setconrirmPwWarn] = useState(false);
  const [birthWarn, setBirthWarn] = useState(false);

  const [pwConfirm, setPwConfirm] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);

  const [btnActive, setBtnActive] = useState(false);

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

  const onChangePw = (e) => {
    setPw(e.currentTarget.value);
  };
  useEffect(() => {
    var regPw =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/;
    if (pw === "") {
      setPwConfirm(false);
      setPwWarn(false);
    } else {
      if (!regPw.test(pw)) {
        setPwConfirm(false);
        setPwWarn(true);
      } else {
        setPwWarn(false);
        setPwConfirm(true);
      }
    }
  }, [pw]);
  const onChangeConfirmPw = (e) => {
    setConfirmPw(e.currentTarget.value);
  };
  useEffect(() => {
    var regPw =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/;
    if (confirmPw === "") {
      setPwCheck(false);
      setconrirmPwWarn(false);
    } else {
      if (confirmPw !== pw || !regPw.test(confirmPw)) {
        setPwCheck(false);
        setconrirmPwWarn(true);
      } else {
        setconrirmPwWarn(false);
        setPwCheck(true);
      }
    }
  }, [confirmPw]);

  useEffect(() => {
    if (
      pwWarn === false &&
      pwConfirm === true &&
      pwCheck === true &&
      confirmPwWarn === false
    ) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [pwWarn, pwConfirm, pwCheck, confirmPwWarn]);

  useEffect(()=>{
    activeBtn({active: btnActive})
  }, [btnActive])

  const selectYear = (e) => {
    setYear(e.target.value);
  };
  const selectMonth = (e) => {
    setMonth(e.target.value);
  };
  const selectDay = (e) => {
    setDay(e.target.value);
  };

  useEffect(() => {
    if (year === "" && month === "" && day === "") {
      setBirthWarn(false);
    } else {
      if (year === "" || month === "" || day === "") {
        setBirthWarn(true);
      } else {
        setBirthWarn(false);
      }
    }
  }, [year, month, day]);


  useEffect(()=>{
    if (
      pwWarn === false &&
      pwConfirm === true &&
      pwCheck === true &&
      confirmPwWarn === false
    ) {
      twoInfo({
        password: pw,
        birth: `${year}-${("00" + month.toString()).slice(-2)}-${("00" + day.toString()).slice(-2)}`,
      });
    }
  },[pw, confirmPw, year, month, day ])

  return (
    <div>
      <PwContainer>
        <Title>????????????</Title>
        <InputBox>
          <Input
            type={"password"}
            placeholder="???????????? ??????"
            maxLength="20"
            onChange={onChangePw}
            value={pw}
          ></Input>
        </InputBox>
        <PwInfo>
          ??????????????? ?????? ????????????, ??????, ??????????????? ?????? ???????????? 8~12??????
          ??????????????????.
        </PwInfo>
        <Warning active={pwWarn}>??????????????? ??????????????????.</Warning>
        <Confirm active={pwConfirm}>????????? ?????????????????????.</Confirm>
      </PwContainer>

      <Container>
        <Title>???????????? ??????</Title>
        <InputBox>
          <Input
            type={"password"}
            placeholder="???????????? ??????"
            maxLength="20"
            onChange={onChangeConfirmPw}
            value={confirmPw}
          ></Input>
          <CheckText></CheckText>
        </InputBox>
        <Warning active={confirmPwWarn}>??????????????? ??????????????????.</Warning>
        <Confirm active={pwCheck}>??????????????? ?????????????????????.</Confirm>
      </Container>

      <Container>
        <Title>????????????</Title>
        <AgeSelectors>
          <AgeSelector onChange={selectYear}>
            <option value="">??????</option>
            {yearArr.map((y, index) => {
              return <option key={index} value={y.toString()}>{y}???</option>;
            })}
          </AgeSelector>
          <AgeSelector onChange={selectMonth}>
            <option value="">???</option>
            {monthArr.map((m, index) => {
              return (
                <option key={index} value={m.toString()}>
                  {m}???
                </option>
              );
            })}
          </AgeSelector>
          <AgeSelector onChange={selectDay}>
            <option value="">???</option>
            {dayArr.map((d, index) => {
              return (
                <option key={index} value={d.toString()}>
                  {d}???
                </option>
              );
            })}
          </AgeSelector>
        </AgeSelectors>
        <Warning active={birthWarn}>??????????????? ?????? ??????????????????.</Warning>
      </Container>

      {/* <BtnBox>
        <Btn onClick={nextBtn} active={btnActive}>
          ????????????
        </Btn>
      </BtnBox> */}
    </div>
  );
}

export default PageTwo;
