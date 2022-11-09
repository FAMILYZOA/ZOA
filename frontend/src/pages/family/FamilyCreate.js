import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/white-logo.png";
import { IoIosArrowBack } from "react-icons/io";

const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  img {
    height: 32px;
    margin: auto;
  }
  z-index: 1;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: 10% 5%;
`;

const FamilyName = styled.div`
  display: flex;
  font-weight: bold;
  margin: 0 4px;
`;

const FamilyNameInput = styled.input`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom: 1;
  margin: 32px 4px;
  width: 95%;
  height: 40px;
  border-color: #ffd5d7;
  outline: 0;
  font-size: 20px;
  text-align: center;
  background-color: transparent;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #666666;
    font-weight: 500;
  }
`;

const FamilyPostButton = styled.button`
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  background-color: transparent;
  width: 80%;
  color: white;
  background: linear-gradient(to left, #fe9b7c, #fec786);
  font-size: 0.5em;
  .unactiveBtn {
    @include buttonDefault;
    background: linear-gradient(to left, #fe9b7c, #fec786);
    opacity: 0.5;
  }
  .activeBtn {
    @include buttonDefault;
    background: linear-gradient(to left, #fe9b7c, #fec786);
  }
  margin-left: 10%;
  margin-top: 20%;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  width: 90%;
  height: 48px;
  margin: 16px auto;
  background: linear-gradient(45deg, #fec786, #fe9b7c);
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1em;
  color: white;
  opacity: ${(props) => (props.active === false ? 0.5 : 1)};
`;

const FamilyCreate = () => {
  const [familyName, setFamilyName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleFamilyNameInput = (e) => {
    setFamilyName(e.target.value);
    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const accessToken = useAppSelector((state) => state.token.access);

  const onPostFam = () => {
    console.log(accessToken);
    axios({
      method: "post",
      url: "https://k7b103.p.ssafy.io/api/v1/family/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name: familyName,
      },
    })
      .then((res) => {
        //console.log(res.data)
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const moveToBack = () => {
    navigate("/intro");
  };

  return (
    <>
      <HeaderBox>
        <IconBox onClick={moveToBack}>
          <IoIosArrowBack size="24" />
        </IconBox>
        <img src={logo} alt="" />
        <div></div>
      </HeaderBox>
      <Container>
        <FamilyName>
          가족 이름 <span style={{ color: "red" }}>*</span>
        </FamilyName>
        <FamilyNameInput
          maxLength={12}
          placeholder="우리 가족의 이름을 입력해주세요."
          type="string"
          name="familyName"
          onChange={handleFamilyNameInput}
        ></FamilyNameInput>
        <div>
          {isActive ? (
            <BtnBox>
              <Btn onClick={onPostFam} active={"active"}>
                가족 생성하기
              </Btn>
            </BtnBox>
          ) : (
            <BtnBox>
              <Btn active={false}>가족 생성하기</Btn>
            </BtnBox>
          )}
        </div>
      </Container>
    </>
  );
};

export default FamilyCreate;
