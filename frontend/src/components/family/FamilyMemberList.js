import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const MemberInfo = styled.div`
  display: flex;
  margin-bottom: 2vh;
  font-size: 2.5vh;
  align-items: center;
`;
const MemberProfile = styled.div`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  margin-right: 1.5vh;
`;
const MemberProfileImg = styled.img`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  object-fit: fill;
`;

const NameEditInput = styled.input`
  border-left-width:0;
  　border-right-width:0;
  　border-top-width:0;
  　border-bottom:1;
  width: 80%;
  height: 30px;
  border-color: #ffd5d7;
  outline: 0;
`

const NameEditButton = styled.button`
border: 2px solid;
border-radius: 8px;
background-color: transparent;
border-color: #ffd5d7;
color: #ff787f;
font-size: 16px;
cursor: pointer;
`;

const FamilyMemberList = ({id, name, image, set_name}) => {

    const NameResult = () => {
        // 커스텀 설정된 이름이 있는지 확인
        if (set_name !== "") {
          return `${name} (${set_name})`;
        } else if (!name) {
          return "";
        } else {
          return name;
        }
      };

    // 이름 수정 api
    const onEditName = () => {
    axios({
        method: "put",
        url: 'https://k7b103.p.ssafy.io/api/v1/family/31',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MjA5NTU5LCJpYXQiOjE2NjcxMjMxNTksImp0aSI6IjNjMzI1NjZjMjMyYTQ1MWQ4OWRkMWI5NjZmYjM5ZWE0IiwidXNlcl9pZCI6MjJ9.UbK79emS3ReB5rxUJLmK3RG6aZPp1o0_S20Bqfu3rqw'
        },
        data: {
            name: editName
        }
    })
    .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {  
        console.log(err)
      })
    };
    
    const [editName, setEditName] = useState('');
    const handleNameEdit = (e) => {
        setEditName(e.target.value)
      };

      // 이름 수정 창 여닫기
      const [edited, setEdited] = useState(false);
      const onClickEditButton = () => {
        setEdited(!edited);
      };
    
    return(
        <>
      <MemberInfo>
        <MemberProfile>
          <MemberProfileImg src={image}></MemberProfileImg>
        </MemberProfile>
        <div>
          { edited === true ?
            <NameEditInput
              placeholder={name}
              onChange={handleNameEdit}
            />
            : <div onClick={onClickEditButton}>{NameResult()}</div>}
        </div>
        <div>
          { edited === true ?
          <NameEditButton
            onClick={() => {
                onClickEditButton();
                onEditName();
            }}
          >수정</NameEditButton> : <></>}
        </div>
      </MemberInfo>
      </>
    )
};

export default FamilyMemberList;