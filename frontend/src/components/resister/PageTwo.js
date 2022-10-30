import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";


const Container = styled.div`
  margin: 8px 0 8px;
  height: 88px;
`;
const PwContainer = styled.div`
  margin: 16px 0;
  height: 120px;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0 0 4px 8px;
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
const PwInfo = styled.p`
  font-size: 12px;
  margin: 4px 0 0px 8px;
  color: #707070;
  display: ${(props) => (props.active == false ? "none" : "block")};
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
  font-size: 16px;
  line-height: 100%;
  /* or 20px */

  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;

  text-align: center;
  color: #707070;

  background: rgba(255,255,255,0.2);
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
  opacity: ${(props) => (props.active ? "1" : "0.5")};
`;

function PageTwo({twoInfo}) {
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
      if (confirmPw === "") {
        setPwCheck(false);
        setconrirmPwWarn(false);
      } else {
        if (confirmPw !== pw) {
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
    }, [
      pwWarn,
      pwConfirm,
      pwCheck,
      confirmPwWarn,
    ]);

    const selectYear = (e) => {
      setYear(e.target.value);
    };
    const selectMonth = (e) => {
      setMonth(e.target.value);
    };
    const selectDay = (e) => {
      setDay(e.target.value);
    };

    useEffect(()=> {
        if (year === "" && month === "" && day === "") {
            setBirthWarn(false);
        } else {
            if (year === "" || month === "" || day==="") {
                setBirthWarn(true);
            } else {
                setBirthWarn(false);
            }
        }
    }, [year, month, day])


    const nextBtn = () => {
      if (
        pwWarn === false &&
        pwConfirm === true &&
        pwCheck === true &&
        confirmPwWarn === false
      ) {
         const birth = String(year) + '-' + String(month) + '-' + String(day);
        twoInfo({
        password: pw,
        birth: birth,
        });
      }
    };


    return (
      <div>
        <PwContainer>
          <Title>비밀번호</Title>
          <InputBox>
            <Input
              type={"password"}
              placeholder="비밀번호 입력"
              onChange={onChangePw}
              value={pw}
            ></Input>
          </InputBox>
          <PwInfo>
            비밀번호는 영문 대소문자, 숫자, 특수기호를 모두 포함아혀 8~20자로
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
              onChange={onChangeConfirmPw}
              value={confirmPw}
            ></Input>
            <CheckText></CheckText>
          </InputBox>
          <Warning active={confirmPwWarn}>비밀번호가 다릅니다.</Warning>
          <Confirm active={pwCheck}>비밀번호가 확인되었습니다.</Confirm>
        </Container>

        <Container>
          <Title>생년월일</Title>
          <AgeSelectors>
            <AgeSelector onChange={selectYear}>
              <option value="">년도</option>
              <option value="2021">2021년</option>
              <option value="2020">2020년</option>
              <option value="2019">2019년</option>
              <option value="2018">2018년</option>
              <option value="2017">2017년</option>
              <option value="2016">2016년</option>
              <option value="2015">2015년</option>
              <option value="2014">2014년</option>
              <option value="2013">2013년</option>
              <option value="2012">2012년</option>
              <option value="2011">2011년</option>
              <option value="2010">2010년</option>
              <option value="2009">2009년</option>
              <option value="2008">2008년</option>
              <option value="2007">2007년</option>
              <option value="2006">2006년</option>
              <option value="2005">2005년</option>
              <option value="2004">2004년</option>
              <option value="2003">2003년</option>
              <option value="2002">2002년</option>
              <option value="2001">2001년</option>
              <option value="2000">2000년</option>
              <option value="1999">1999년</option>
              <option value="1998">1998년</option>
              <option value="1997">1997년</option>
              <option value="1996">1996년</option>
              <option value="1995">1995년</option>
              <option value="1994">1994년</option>
              <option value="1993">1993년</option>
              <option value="1992">1992년</option>
              <option value="1991">1991년</option>
              <option value="1990">1990년</option>
              <option value="1989">1989년</option>
              <option value="1988">1988년</option>
              <option value="1987">1987년</option>
              <option value="1986">1986년</option>
              <option value="1985">1985년</option>
              <option value="1984">1984년</option>
              <option value="1983">1983년</option>
              <option value="1982">1982년</option>
              <option value="1981">1981년</option>
              <option value="1980">1980년</option>
              <option value="1979">1979년</option>
              <option value="1978">1978년</option>
              <option value="1977">1977년</option>
              <option value="1976">1976년</option>
              <option value="1975">1975년</option>
              <option value="1974">1974년</option>
              <option value="1973">1973년</option>
              <option value="1972">1972년</option>
              <option value="1971">1971년</option>
              <option value="1970">1970년</option>
              <option value="1969">1969년</option>
              <option value="1968">1968년</option>
              <option value="1967">1967년</option>
              <option value="1966">1966년</option>
              <option value="1965">1965년</option>
              <option value="1964">1964년</option>
              <option value="1963">1963년</option>
              <option value="1962">1962년</option>
              <option value="1961">1961년</option>
              <option value="1960">1960년</option>
              <option value="1959">1959년</option>
              <option value="1958">1958년</option>
              <option value="1957">1957년</option>
              <option value="1956">1956년</option>
              <option value="1955">1955년</option>
              <option value="1954">1954년</option>
              <option value="1953">1953년</option>
              <option value="1952">1952년</option>
              <option value="1951">1951년</option>
              <option value="1950">1950년</option>
              <option value="1949">1949년</option>
              <option value="1948">1948년</option>
              <option value="1947">1947년</option>
              <option value="1946">1946년</option>
              <option value="1945">1945년</option>
              <option value="1944">1944년</option>
              <option value="1943">1943년</option>
              <option value="1942">1942년</option>
              <option value="1941">1941년</option>
              <option value="1940">1940년</option>
              <option value="1939">1939년</option>
              <option value="1938">1938년</option>
              <option value="1937">1937년</option>
              <option value="1936">1936년</option>
              <option value="1935">1935년</option>
              <option value="1934">1934년</option>
              <option value="1933">1933년</option>
              <option value="1932">1932년</option>
              <option value="1931">1931년</option>
              <option value="1930">1930년</option>
              <option value="1929">1929년</option>
              <option value="1928">1928년</option>
              <option value="1927">1927년</option>
              <option value="1926">1926년</option>
              <option value="1925">1925년</option>
              <option value="1924">1924년</option>
              <option value="1923">1923년</option>
              <option value="1922">1922년</option>
              <option value="1921">1921년</option>
            </AgeSelector>
            <AgeSelector onChange={selectMonth}>
              <option value="">월</option>
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </AgeSelector>
            <AgeSelector onChange={selectDay}>
              <option value="">일</option>
              <option value="01">1일</option>
              <option value="02">2일</option>
              <option value="03">3일</option>
              <option value="04">4일</option>
              <option value="05">5일</option>
              <option value="06">6일</option>
              <option value="07">7일</option>
              <option value="08">8일</option>
              <option value="09">9일</option>
              <option value="10">10일</option>
              <option value="11">11일</option>
              <option value="12">12일</option>
              <option value="13">13일</option>
              <option value="14">14일</option>
              <option value="15">15일</option>
              <option value="16">16일</option>
              <option value="17">17일</option>
              <option value="18">18일</option>
              <option value="19">19일</option>
              <option value="20">20일</option>
              <option value="21">21일</option>
              <option value="22">22일</option>
              <option value="23">23일</option>
              <option value="24">24일</option>
              <option value="25">25일</option>
              <option value="26">26일</option>
              <option value="27">27일</option>
              <option value="28">28일</option>
              <option value="29">29일</option>
              <option value="30">30일</option>
              <option value="31">31일</option>
            </AgeSelector>
          </AgeSelectors>
          <Warning active={birthWarn}>생년월일을 모두 선택해주세요.</Warning>
        </Container>

        <BtnBox>
          <Btn onClick={nextBtn} active={btnActive}>
            회원가입
          </Btn>
        </BtnBox>
      </div>
    );
}

export default PageTwo;