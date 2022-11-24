import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFamilyId,
  setFamilyName,
  setFamilyUsers,
  setFamilyCreatedAt,
} from "../../features/family/familySlice";
import { IoIosArrowBack } from "react-icons/io";

const logo =
  "https://user-images.githubusercontent.com/97648026/203668440-eb211853-8abe-4dc5-b0ee-8912e5cfefa3.png";

interface buttonProps {
  isCode?: boolean;
}

const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;

const IconBox = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    height: 32px;
  }
`;

const CodeJoinBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30vh 0 0;
`;
const Guide = styled.div`
  width: 80%;
  margin: 0 auto 1.6em;
  font-size: 0.9em;
  line-height: 1.3em;
`;
const NameEditInput = styled.input`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom: 1;
  width: 90%;
  height: 1em;
  background-color: transparent;
  border-color: #ffd5d7;
  outline: 0;
  font-family: "Pretendard-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.2em;
  margin: auto 5%;
`;
const FamilyParticipateBtn = styled.button<buttonProps>`
  width: 90%;
  height: 56px;
  margin: auto;
  background: #fe9b7c;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
  opacity: ${(props) => (props.isCode ? "1" : "0.5")};
`;
const ValidMessage = styled.div`
  color: #ff787f;
  height: 1.2em;
  font-size: 0.8em;
`;

const FamilyCodeJoin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [isValid, setIsVaild] = useState<boolean>(true);
  const accessToken = useAppSelector((state) => state.token.access);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleSubmit = () => {
    console.log(code);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BACK_HOST}/family/invitation_code/sign/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        invitationcode: `${code}`,
      },
    })
      .then((res) => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => {
          if (res.data.id >= 0) {
            dispatch(setFamilyId(res.data.id));
            dispatch(setFamilyName(res.data.name));
            dispatch(setFamilyCreatedAt(res.data.created_at));
            dispatch(setFamilyUsers(res.data.users));
          }
        });
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsVaild(false);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/intro");
    }
  }, []);

  const moveToBack = () => {
    navigate("/family/select/");
  };

  return (
    <>
      <HeaderBox>
        <IconBox onClick={moveToBack}>
          <IoIosArrowBack size="24" />
        </IconBox>
        <ImgBox>
          <img src={logo} alt="" />
        </ImgBox>
        <div></div>
      </HeaderBox>
      <CodeJoinBody>
        <Guide>초대시 받은 코드를 입력해주세요!</Guide>
        <div style={{ marginBottom: "0.4em" }}>
          <div style={{ marginBottom: "0.4em" }}>
            <NameEditInput
              placeholder="초대 코드"
              onChange={handleCodeChange}
            />
          </div>
          <ValidMessage>
            {isValid ? "" : "유효한 코드가 아닙니다."}
          </ValidMessage>
        </div>
        <FamilyParticipateBtn
          isCode={!!code}
          disabled={!code}
          onClick={handleSubmit}
        >
          참여하기
        </FamilyParticipateBtn>
      </CodeJoinBody>
    </>
  );
};

export default FamilyCodeJoin;
