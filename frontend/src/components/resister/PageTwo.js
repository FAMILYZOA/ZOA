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

  // const nextBtn = () => {
  //   if (
  //     pwWarn === false &&
  //     pwConfirm === true &&
  //     pwCheck === true &&
  //     confirmPwWarn === false
  //   ) {
  //     const birth = String(year) + "-" + String(month) + "-" + String(day);
  //     twoInfo({
  //       password: pw,
  //       birth: birth,
  //     });
  //   }
  // };

  useEffect(()=>{
    if (
      pwWarn === false &&
      pwConfirm === true &&
      pwCheck === true &&
      confirmPwWarn === false
    ) {
      if(String(month).length === 1 && String(day).length === 1) {
        const birth = String(year) + "-0" + String(month) + "-0" + String(day);
        twoInfo({
          password: pw,
          birth: birth,
        });
      } else if (String(month).length === 1){
        const birth = String(year) + "-0" + String(month) + "-" + String(day);
        twoInfo({
          password: pw,
          birth: birth,
        });
      } else if (String(day).length === 1){
        const birth = String(year) + "-" + String(month) + "-0" + String(day);
        twoInfo({
          password: pw,
          birth: birth,
        });
      } else {
        const birth = String(year) + "-" + String(month) + "-" + String(day);
        twoInfo({
          password: pw,
          birth: birth,
        });
      }
    }
  },[pw, confirmPw, year, month, day ])

  return (
    <div>
      <PwContainer>
        <Title>비밀번호</Title>
        <InputBox>
          <Input
            type={"password"}
            placeholder="비밀번호 입력"
            maxLength="20"
            onChange={onChangePw}
            value={pw}
          ></Input>
        </InputBox>
        <PwInfo>
          비밀번호는 영문 대소문자, 숫자, 특수기호를 모두 포함하여 8~12자로
          입력해주세요.
        </PwInfo>
        <Warning active={pwWarn}>비밀번호를 확인해주세요.</Warning>
        <Confirm active={pwConfirm}>안전한 비밀번호입니다.</Confirm>
      </PwContainer>

      <Container>
        <Title>비밀번호 확인</Title>
        <InputBox>
          <Input
            type={"password"}
            placeholder="비밀번호 확인"
            maxLength="20"
            onChange={onChangeConfirmPw}
            value={confirmPw}
          ></Input>
          <CheckText></CheckText>
        </InputBox>
        <Warning active={confirmPwWarn}>비밀번호를 확인해주세요.</Warning>
        <Confirm active={pwCheck}>비밀번호가 확인되었습니다.</Confirm>
      </Container>

      <Container>
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
        <Warning active={birthWarn}>생년월일을 모두 선택해주세요.</Warning>
      </Container>

      {/* <BtnBox>
        <Btn onClick={nextBtn} active={btnActive}>
          회원가입
        </Btn>
      </BtnBox> */}
    </div>
  );
}

export default PageTwo;
