import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    font-size: 14px;
    margin: 4px 0 8px 8px;
    color: red;
    display: ${props => props.active == false ? 'none': 'block'}
`
const Confirm = styled.p`
  font-size: 14px;
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
`

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
    phone: '',
    birth: '',
  });

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [phone, setPhone] = useState('');
  

  const onPhoneChange = (e) => {
        setPhone(e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    )}
    useEffect(()=> {
        if(phone.length === 13){
            setInfo((pre)=>{return{
                ...pre, phone:phone
            }})
        } else{
            setInfo((pre)=> {
                return{...pre, phone:''}
            })
        }
    },[phone])
    const onCertChange = (e) => {
        setNum(e.currentTarget.value);
    }
    
    const selectYear = (e) => {
        setYear(e.target.value);
    }
    const selectMonth = (e) => {
        setMonth(e.target.value);
    }
    const selectDay = (e) => {
        setDay(e.target.value);
    }
    const [pwarn, setPwarn] = useState(false);
  const [bwarn, setBwarn] = useState(false);
  const [nwarn, setNwarn] = useState(false);
  const [nconfirm, setNconfirm] = useState(false);
  const [cconfirm, setCconfirm] = useState(false);
  // 유저가 입력한 인증번호
  const [certifiNum, setNum] = useState("");
  // 인증 성공 여부
  const [cerCheck, setCheck] = useState(false);
  

  const pushNum = (phone) => {
    setNconfirm(true);
    const data = new FormData();
    data.append("phone", phone.replaceAll("-", ""));
    axios({
      method: "POST",
      url: `https://k7b103.p.ssafy.io/api/v1/event/`,
      data: data,
    })
  }
  
  const clickCheck = (certifiNum) => {
    const data = new FormData();
    data.append("phone", phone.replaceAll("-", ""));
    data.append("certification", certifiNum);
    axios({
      method: "POST",
      url: `https://k7b103.p.ssafy.io/api/v1/event/check/`,
      data: data,
    }).then((res) => {
        if (res.status === 200) {
            setNwarn(false);
            setCconfirm(true);
            setCheck(true);
        } 
    }).catch((err) => {
        if (err.response.status === 401) {
            setCconfirm(false);
            setNwarn(true);
        }else if (err.response.status === 404) {
            setCconfirm(false);
            setNwarn(true);
        } else if (err.response.status === 429) {
          console.log("짧은 시간안에 너무 많은 요청을 보냈습니다.");
        } else if (err.response.status === 500) {
          console.log("server error");
        }
    })
  }


  const push = () => {
    if(cerCheck == false) {
        setNwarn(true);
    } else {
        if (info.phone === '') {
            setNconfirm(false);
            setPwarn(true);
        } else if(year === '' || month === '' || day===''){
            setPwarn(false);
            setBwarn(true);
        } else {
            const birth = String(year) + '-' + String(month) + '-' + String(day);
            setInfo((pre) => {return{...pre, birth: birth}})
            const data = new FormData();
            data.append("kakao_id", info.kakao_id);
            data.append("name", info.name);
            data.append("image", info.image);
            data.append("phone", info.phone.replaceAll("-", ""));
            data.append("birth", info.birth);
            axios({
                method: "POST",
                url: `https://k7b103.p.ssafy.io/api/v1/accounts/kakao/sign/`,
                data: data,
            })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/");
                }
            }).catch((err) => {
                if (err.response.status === 400) {
                    console.log(err)
                    alert('이미 가입된 회원입니다. 로그인을 해주세요.');
                    navigate("/intro");
                } else {
                console.log("예상치 못한 에러군,,,");
                }
            })
        }

    }
  }
  return (
    <div>
      <Header label={"회원가입"} back="false"></Header>
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
            ></PhoneInput>
            <CheckText onClick={()=> pushNum(phone)}>인증번호 받기</CheckText>
          </PhoneInputBox>
          <Warning active={pwarn}>휴대폰 번호를 확인해주세요.</Warning>
          <Confirm active={nconfirm}>인증번호를 전송하였습니다.</Confirm>
        </InputBox>
        <InputBox>
          <Title>인증번호</Title>
          <PhoneInputBox>
            <PhoneInput
                type="number"
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
