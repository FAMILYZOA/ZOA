import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logo from "../../assets/white-logo.png";
import { setFamilyId, setFamilyName, setFamilyUsers, setFamilyCreatedAt } from "../../features/family/familySlice"

interface buttonProps {
  isCode?: boolean;
}

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
  width: 80%;
  height: 1em;
  background-color: transparent;
  border-color: #ffd5d7;
  outline: 0;
  font-family: "Pretendard-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.2em;
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
  color: #FF787F;
  height: 1.2em;
  font-size: 0.8em;
`


const FamilyCodeJoin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [isValid, setIsVaild] = useState<boolean>(true);
  const accessToken = useAppSelector(state => state.token.access);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }
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
      }
    })
      .then((res) => {
        dispatch(setFamilyId(res.data.id));
        dispatch(setFamilyName(res.data.name));
        dispatch(setFamilyCreatedAt(res.data.created_at));
        dispatch(setFamilyUsers(res.data.users));
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsVaild(false);
      })
  }

  useEffect(() => {
    if(!localStorage.getItem("access_token")) {
      navigate("/intro");
    }
  },[])


  return (
    <>
      <Header>
        <img src={logo} alt="" />
      </Header>
      <CodeJoinBody>
        <Guide>
          초대시 받은 코드를 입력해주세요!
        </Guide>
        <div style={{marginBottom:"0.4em"}}>
          <div style={{marginBottom:"0.4em"}}>
            <NameEditInput
              placeholder="초대 코드"
              onChange={handleCodeChange}
            />
          </div>
          <ValidMessage>{isValid ? "" : "유효한 코드가 아닙니다."}</ValidMessage>
        </div>
        <FamilyParticipateBtn isCode={!!code} disabled={!code} onClick={handleSubmit}>
          참여하기
        </FamilyParticipateBtn>
      </CodeJoinBody>
    </>
  )
}

export default FamilyCodeJoin;