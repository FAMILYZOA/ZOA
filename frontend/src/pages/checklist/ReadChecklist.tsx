import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectMember from "../../components/checklist/view/SelectMember";
import Header from "../../components/header";
import { CheckItem } from "../../components/checklist/view";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";

const CheckListViewBody = styled.div`
  padding: 3vh 2vh;
`;
const CheckListTitle = styled.div`
  margin: 4.5vh 0;
  font-size: 2.5vh;
  font-weight: bold;
`;

const ViewMore = styled.div`
  text-align: center;
  color: #ff787f;
  font-weight: 400;
  font-size: 2vh;
`;

function ReadChecklist() {
  const [selectedMember, setSelectedMember] = useState<{
    id: number;
    name: string;
    image: string;
    set_name: string;
  }>({
    id: -1,
    name: "",
    image: "",
    set_name: "",
  }); // 선택된 인원
  const [unSelectedMember, setUnSelectedMember] = useState<
    { id: number; name: string; image: string, set_name: string }[]
  >([
    {
      id: -1,
      name: "",
      image: "",
      set_name: "",
    },]); // 선택되지 않은 인원
  const FamilyMembers = useAppSelector((state) => state.family.users);
  const [checkList, setCheckList] = useState<
    { id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }[]
  >([
    {
      id: -1,
      text: "",
      status: false,
      photo: "",
      created_at: "",
      to_user_id: [-1],
    },
  ]);

  const [unCheckedList, setUnCheckedList] = useState<
    { id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }[]
  >([
    {
      id: -1,
      text: "",
      status: false,
      photo: "",
      created_at: "",
      to_user_id: [-1],
    },
  ]);

  const [checkedList, setCheckedList] = useState<
    { id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }[]
  >([
    {
      id: -1,
      text: "",
      status: false,
      photo: "",
      created_at: "",
      to_user_id: [-1],
    },
  ]);

  const [todayCheckedList, setTodayCheckedList] = useState<
    { id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }[]
  >([
    {
      id: -1,
      text: "",
      status: false,
      photo: "",
      created_at: "",
      to_user_id: [-1],
    },
  ]);
  const [viewMore, setViewMore] = useState<boolean>(false);

  const accessToken = useAppSelector((state) => state.token.access)

  const getSelect = (id: number) => {
    let index: number = 0;

    FamilyMembers.forEach((value, i: number) => {
      if (value.id === id) {
        index = i;
        return false;
      }
    });
    setViewMore(false);
    setSelectedMember(FamilyMembers[index]);
    const tempMember = [...FamilyMembers];
    tempMember.splice(index, 1);
    setUnSelectedMember(tempMember);
  };

  const refreshCheckLists = (to_users_id: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/checklist/${to_users_id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setCheckList(res.data);
        console.log("get checklist success")
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    setSelectedMember(FamilyMembers[0]);
    const tempMember = [...FamilyMembers];
    tempMember.splice(0, 1);
    setUnSelectedMember(tempMember);
  })

  useEffect(() => {
    const tempCheckedList: Array<{ id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }> = [];
    const tempUnCheckedList: Array<{ id: number; text: string; status: boolean; photo: string; created_at: string; to_user_id: number[] }> = [];

    checkList.forEach((value) => {
      if (value.status) {
        tempCheckedList.push(value);
      } else {
        tempUnCheckedList.push(value);
      }
    })
    setCheckedList(tempCheckedList);
    setUnCheckedList(tempUnCheckedList);
  },[checkList])

  return (
    <div>
      <Header label="할 일 목록" back="true"></Header>
      <CheckListViewBody>
        <SelectMember
          selectedMember={selectedMember}
          unSelectedMember={unSelectedMember}
          getSelect={getSelect}
        />
        <CheckListTitle>{selectedMember.name} 님의 체크리스트</CheckListTitle>
        {unCheckedList.map((item: any) => (
          <CheckItem item={item} key={item.id} />
        ))}
        {!viewMore &&
          todayCheckedList.map((item: any) => (
            <CheckItem item={item} key={item.id} />
          ))}
        {viewMore &&
          checkedList.map((item: any) => (
            <CheckItem item={item} key={item.id} />
          ))}
        {!viewMore && (
          <ViewMore onClick={() => setViewMore(true)}>+ 더보기</ViewMore>
        )}
      </CheckListViewBody>
    </div>
  );
}

export default ReadChecklist;
