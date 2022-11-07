import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { setFamilyUsers } from "../../features/family/familySlice"

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

const InputContainer = styled.div`
  width: 80%;
  display: grid;
`;

const NameEditInput = styled.input`
  border-left-width: 0;
  　border-right-width: 0;
  　border-top-width: 0;
  　border-bottom: 1;
  width: auto;
  height: 30px;
  border-color: #ffd5d7;
  outline: 0;
  background-color: transparent;
`;

const NameEditButton = styled.button`
  border: 2px solid;
  border-radius: 8px;
  background-color: transparent;
  border-color: #ffd5d7;
  color: #ff787f;
  font-size: 16px;
  cursor: pointer;
`;

const FamilyMemberList = ({ id, name, image, set_name }) => {
  const dispatch = useAppDispatch();
  const NameResult = () => {
    // 커스텀 설정된 이름이 있는지 확인
    if (set_name !== false) {
      return `${name} (${set_name})`;
    } else {
      return name;
    }
  };
  const familyId = useAppSelector((state) => state.family.id)
  const token = useAppSelector((state) => state.token.access);
  const navigate = useNavigate();
  useEffect(() => {
    if (token.length === 0) {
      navigate("/intro");
    }
  });

  // 이름 최초 수정 api
  const onPostName = () => {
    axios({
      method: "post",
      url: `https://k7b103.p.ssafy.io/api/v1/family/name/${id}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: editName,
      },
    })
      .then((res) => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/family/${familyId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            dispatch(setFamilyUsers(res.data.users));
            console.log("family fetched");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이름 수정 api
  const onEditName = () => {
    axios({
      method: "put",
      url: `https://k7b103.p.ssafy.io/api/v1/family/name/${id}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: editName,
      },
    })
      .then((res) => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/family/${familyId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            dispatch(setFamilyUsers(res.data.users));
            console.log("family fetched");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [editName, setEditName] = useState("");
  const handleNameEdit = (e) => {
    setEditName(e.target.value);
  };

  // 이름 수정 창 여닫기
  const [edited, setEdited] = useState(false);
  const onClickEditButton = () => {
    setEdited(!edited);
  };

  return (
    <>
      <MemberInfo>
        <MemberProfile>
          <MemberProfileImg src={image}></MemberProfileImg>
        </MemberProfile>
        <div>
          {edited === true ? (
            <InputContainer>
              <NameEditInput placeholder={set_name} onChange={handleNameEdit} />
            </InputContainer>
          ) : (
            <div onClick={onClickEditButton}>{NameResult()}</div>
          )}
        </div>
        <div>
          {edited === true ? (
            <NameEditButton
              onClick={() => {
                if (set_name !== false) {
                  onEditName(id);
                  onClickEditButton();
                } else {
                  onPostName(id);
                  onClickEditButton();
                }
              }}
            >
              수정
            </NameEditButton>
          ) : (
            <></>
          )}
        </div>
      </MemberInfo>
    </>
  );
};

export default FamilyMemberList;
