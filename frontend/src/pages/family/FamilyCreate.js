import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const FamilyName = styled.div`
  display: flex;
  font-weight: bold;
`

const EssentialInput = styled.div`
  color: red;
`

const FamilyNameInput = styled.input`
  border-left-width:0;
  　border-right-width:0;
  　border-top-width:0;
  　border-bottom:1;
  width: 80%;
  height: 30px;
  border-color: #ffd5d7;
  outline: 0;
`;

const FamilyPostButton = styled.button`
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  background-color: transparent;
  width: 80%;
  color: white;
  background: linear-gradient(to left, #FE9B7C, #fec786);
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-size: 3vh;
  .unactiveBtn {
    @include buttonDefault;
    background: linear-gradient(to left, #FE9B7C, #fec786);
    opacity: 0.5;
  }
  .activeBtn {
    @include buttonDefault;
    background: linear-gradient(to left, #FE9B7C, #fec786);
  }
`

const FamilyPostUnButton = styled.button`
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  background-color: transparent;
  width: 80%;
  color: white;
  background: linear-gradient(to left, #FE9B7C, #fec786);
  opacity: 0.5;
  font-size: 3vh;
`

const FamilyCreate = () => {

  const [familyName, setFamilyName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const handleFamilyNameInput = (e) => {
    setFamilyName(e.target.value)
    if (e.target.value !== '') {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  };

  // 가족 생성 api 요청 HEADERS에 ACCESS TOKEN추가
  const onPostFamily = () => {
    const config = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2ODU2MTg5LCJpYXQiOjE2NjY4NDg5ODksImp0aSI6IjJlNTdhY2M1MWJiZjRiNjk4ZjI0YWM3NjIyMzEzYjc4IiwidXNlcl9pZCI6M30.CnU-lhZVyPgHgBnJCF3hefZsahunW8mPnHlJrsNAVZI'
      }
    };
    const url = 'http://127.0.0.1:8000/api/v1/family/';
    const data = {
      name: familyName
    }
    axios.post(url, data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div>
        헤더자리
      </div>
      <FamilyName>
        가족 이름
        <EssentialInput>*</EssentialInput>
      </FamilyName>
        <FamilyNameInput
          maxLength={12}
          placeholder="우리 가족의 이름을 입력해주세요"
          type="string"
          name="familyName"
          onChange={handleFamilyNameInput}
        ></FamilyNameInput>
        <div>
          {isActive ?
           <FamilyPostButton onClick={onPostFamily}>가족 생성하기</FamilyPostButton>
           :
           <FamilyPostUnButton>가족 생성하기</FamilyPostUnButton>}
        </div>
    </>
  )
};

export default FamilyCreate;