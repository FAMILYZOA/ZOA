import * as React from "react";
import styled from "styled-components";
import { customAxios } from "../../api/customAxios";
import Header from "../../components/header";
import DefaultProfile from "../../assets/defaultProfile.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export interface ISignUpProps {}

export interface IInnerFormProps {
  formName: string;
  formType: string;
  formValue?: string;
  formEvent: React.ChangeEventHandler<HTMLInputElement>;
}

export interface IFormStates {
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  passwordSame: boolean;
  year: string;
  month: string;
  day: string;
  nextPage: boolean;
  isSignup: boolean;
}

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
`;

const InnerFormStyle = styled.div`
  display: inline-block;
  margin-top: 2vh;
`;

const FormNameStyle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 16px */
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
`;

const FormInputStyle = styled.input`
  box-sizing: border-box;

  width: 80vw;
  height: 6vh;

  font-size: 24px;

  background: #ffffff;
  border: 2px solid #ff787f;
  box-shadow: 0px 0px 4px #bebebe;
  border-radius: 10px;
`;

const SignupNextStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4vh;
`;

const FormImgDescStyle = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 16px */

  letter-spacing: -0.01em;

  color: #000000;
`;

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 50vw;

  border-radius: 50%;
`;

const ProfileImgStyle = styled.img`
  max-width: 100%;
  clip-path: circle(25vw at center);
`;

const AgeDescStyle = styled.p`
  width: 80vw;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 16px */

  letter-spacing: -0.01em;
  text-align: start;

  color: #000000;
`;

const AgeSelectors = styled.div`
  margin-bottom: 6vh;
`;

const AgeSelector = styled.select`
  width: 24vw;
  height: 10vw;

  margin-left: 2vw;
  margin-right: 2vw;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 100%;
  /* or 20px */

  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;

  text-align: center;

  background: #ffffff;
  border: 1px solid #ff787f;
  box-shadow: 0px 0px 4px #bebebe;
  border-radius: 10px;
`;

const ButtonStyle = styled.button`
  margin-top: 20vh;
  width: 80vw;
  height: 6vh;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  /* or 24px */

  letter-spacing: -0.01em;

  color: #ffffff;

  background: linear-gradient(92.7deg, #fec786 11.06%, #fe9b7c 92.72%);

  border-radius: 20px;
  border: none;
`;

const FooterOuterStyle = styled.div`
  position: absolute;
  top: 90vh;
  width: 100%;
  text-align: center;
`;

const FooterStyle = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */

  margin: auto;
  letter-spacing: -0.02em;

  color: #000000;
`;

// 글자와 input form 한 세트
const InnerForm = (props: any) => {
  return (
    <InnerFormStyle>
      <FormNameStyle>{props.formName}</FormNameStyle>
      <FormInputStyle
        type={props.formType}
        onChange={props.formEvent}
        value={props.formValue}
        maxLength={props.formName === "전화번호" ? 13 : 12}
      />
    </InnerFormStyle>
  );
};

// 각 input 컴포넌트 (이름, 전화번호, 비밀번호, 비밀번호 확인) 묶음
const Form = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [passwordSame, setPasswordSame] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<boolean>(false);

  useEffect(() => {
    if (!passwordSame) {
      checkPassword();
    }
  });

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(
      e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handlePasswordConfirm = (e: React.FormEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.currentTarget.value);
  };

  const checkPassword = () => {
    if (!passwordSame) {
      if (password !== "") {
        if (password === passwordConfirm) {
          setPasswordSame(true);
        }
      }
    } else {
      if (password !== "") {
        if (password !== passwordConfirm) {
          setPasswordSame(false);
        }
      }
    }
  };

  const goNext = () => {
    // 정규식 문제 있음
    //const REGEX_PASSWORD: RegExp = new RegExp('^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,12}$');

    if (
      name !== "" &&
      phone !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (passwordSame) {
        //console.log(this.state.password.match(REGEX_PASSWORD))
        //if (this.state.password.match(REGEX_PASSWORD)) {
        setNextPage(true);
        //} else {
        //  console.log(this.state.password)
        //  alert(
        //    "비밀번호는 8~12 글자의 영문 대소문자, 숫자, 특수문자의 조합으로 이루어져야합니다."
        //  );
        //}
      } else {
        alert("비밀번호가 다릅니다.");
      }
    } else {
      alert("빈 칸이 있습니다.");
    }
  };

  const selectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.currentTarget.value);
  };

  const selectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.currentTarget.value);
  };

  const selectDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.currentTarget.value);
  };

  const navigate = useNavigate();
  const signUp = async () => {
    const signupForm = new FormData();
    signupForm.append("name", name);
    signupForm.append("phone", phone.replaceAll("-", ""));
    signupForm.append("password", password);
    signupForm.append("birth", year + "-" + month + "-" + day);

    console.log(signupForm.get('name'));
    console.log(signupForm.get('phone'));
    console.log(signupForm.get('password'));
    console.log(signupForm.get('birth'));


    if (!year || !month || !day) {
      alert("날짜가 없습니다.");
    } else {
      const response =  await customAxios.post("/accounts/signup/", signupForm)

      console.log(response)

      if(response.status === 201){
        alert("회원가입 성공")
        navigate('/login', {replace:true});
      }else{
        alert("몬가 문제가 있음")
      }
    }
  };

  return (
    <div>
      {nextPage ? (
        <SignupNextStyle>
          <FormImgDescStyle>프로필 사진을 변경해보세요</FormImgDescStyle>
          <ProfileStyle>
            <ProfileImgStyle src={DefaultProfile}></ProfileImgStyle>
          </ProfileStyle>
          <AgeDescStyle>생년월일</AgeDescStyle>
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
          <ButtonStyle onClick={signUp}>회원가입</ButtonStyle>
        </SignupNextStyle>
      ) : (
        <FormStyle>
          <InnerForm
            formName="이름"
            formType="text"
            formEvent={handleName}
          ></InnerForm>
          <InnerForm
            formName="전화번호"
            formType="text"
            formValue={phone}
            formEvent={handlePhone}
          ></InnerForm>
          <InnerForm
            formName="비밀번호"
            formType="password"
            formEvent={handlePassword}
          ></InnerForm>
          <InnerForm
            formName="비밀번호 확인"
            formType="password"
            formEvent={handlePasswordConfirm}
          ></InnerForm>
          <ButtonStyle onClick={goNext}>다음</ButtonStyle>
        </FormStyle>
      )}
    </div>
  );
};

const Signup = () => {
  return (
    <div>
      <Header label="회원가입" back={true}></Header>
      <Form></Form>
      <FooterOuterStyle>
        <FooterStyle>Copyright ⓒB103</FooterStyle>
      </FooterOuterStyle>
    </div>
  );
};

export default Signup;
