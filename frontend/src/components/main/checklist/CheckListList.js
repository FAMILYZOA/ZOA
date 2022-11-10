import styled from "styled-components";
import CheckListItem from "./CheckListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router";

const CheckListWrapper = styled.div`
  border-radius: 12px;
  width: 90%;
  height: calc(100vh - 450px);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const ListBox = styled.div`
  margin: 18px 8px;
  width: 100%;
`;

const ListScrollBox = styled.div`
  overflow-y: scroll;
  height: auto;
  max-height: calc(100vh - 510px);
  width: 100%;
`;
const ViewMoreBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: #ff787f;
  margin: auto 8px;
  font-size: 0.9em;
`;

const NoList = styled.div`
  display: flex;
  align-items: center;
`;

const NoListText = styled.p`
  margin: 4px;
`;

const UserImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 30px;
  margin: 5%;
`;

const CheckListList = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token.access);
  const user = useAppSelector((state) => state.user.id);
  const userImg = useAppSelector((state) => state.user.image);
  const [list, setList] = useState([]);

  const getChecklist = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/checklist/${user}/todaycreate`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if(res.data.length !== 0){
          setList([...res.data]);
          setList(
            res.data.map((item) =>
            item ? { ...item, active: false } : list
            )
            );
          }
      })
  }

  useEffect(() => {
    if (user >= 0) {
      getChecklist();
    }
  }, [user]);

  const viewMore = () => {
    navigate("/checklist");
  };

  const checked = () => {
    getChecklist();
  }

  return (
    <CheckListWrapper>
      <UserImg src={userImg} />
      <ListBox>
        <ListScrollBox>
          {list.length !== 0 ? (
            <div>
              {list.map((item, idx) => (
                <CheckListItem item={item} checked={checked} key={idx} />
              ))}
            </div>
          ) : (
            <NoList>
              <NoListText>
                오늘 등록된 할 일이 없습니다.
                <br /> 할 일을 등록해보세요🙂
              </NoListText>
            </NoList>
          )}
        </ListScrollBox>
        <ViewMoreBox>
          <IconBox onClick={viewMore}>
            <FaPlusSquare size={16} color={" #ff787f"} />
          </IconBox>
          <Text onClick={viewMore}>체크리스트 전체 확인</Text>
        </ViewMoreBox>
      </ListBox>
    </CheckListWrapper>
  );
};

export default CheckListList;
