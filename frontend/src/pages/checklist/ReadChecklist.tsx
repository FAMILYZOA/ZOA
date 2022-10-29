import React, { useState } from "react";
import styled from "styled-components";
import SelectMember from "../../components/checklist/view/SelectMember";
import Header from "../../components/header";
import { CheckItem } from "../../components/checklist/view";

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

const ModalBack = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(102,102,102,0.5);
`
const ModalDiv = styled.div`
  position: absolute;
  top: 13vh;
  right: 2vh;
  z-index: 3;
`
const ModalItem = styled.div`
  display: flex;
  align-items: center;
  z-index: 4;
  margin-bottom: 1vh;
  margin-left: auto;
`
const ModalItemName = styled.div`
  margin-right: 1vh;
  font-weight: 700;
  font-size: 2vh;
`
const ModalItemImg = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 4vh;
  object-fit: fill;
`

function ReadChecklist() {
  const [isModal, setIsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    id: number;
    name: string;
    image: string;
  }>({
    id: 1,
    name: "신짱아",
    image:
      "https://user-images.githubusercontent.com/97648026/197681280-abe13572-3872-4e99-8abe-41646cb91f2b.png",
  }); // 선택된 인원
  const [unSelectedMember, setUnSelectedMember] = useState<
    { id: number; name: string; image: string }[]
  >([
    {
      id: 2,
      name: "신짱구",
      image:
        "https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png",
    },
    {
      id: 3,
      name: "봉미선",
      image:
        "https://user-images.githubusercontent.com/97648026/197681295-f9fe8c31-b9e3-4c6d-81e1-63b4df657f1b.png",
    },
    {
      id: 4,
      name: "신형만",
      image:
        "https://user-images.githubusercontent.com/97648026/198463633-0f10182b-21f9-4530-bdcd-428ee9ca2892.png",
    },
  ]); // 선택되지 않은 인원
  const [FamilyMembers, setFamilyMembers] = useState<
    { id: number; name: string; image: string }[]
  >([
    {
      id: 1,
      name: "신짱아",
      image:
        "https://user-images.githubusercontent.com/97648026/197681280-abe13572-3872-4e99-8abe-41646cb91f2b.png",
    },
    {
      id: 2,
      name: "신짱구",
      image:
        "https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png",
    },
    {
      id: 3,
      name: "봉미선",
      image:
        "https://user-images.githubusercontent.com/97648026/197681295-f9fe8c31-b9e3-4c6d-81e1-63b4df657f1b.png",
    },
    {
      id: 4,
      name: "신형만",
      image:
        "https://user-images.githubusercontent.com/97648026/198463633-0f10182b-21f9-4530-bdcd-428ee9ca2892.png",
    },
  ]); // 임시 변수. 상위로부터 props로 받아올 것

  const [checkList, setCheckList] = useState<
    { id: number; text: string; status: boolean; to_user_id: number }[]
  >([
    {
      id: 1,
      text: "1번 할일",
      status: false,
      to_user_id: 1,
    },
    {
      id: 2,
      text: "2번 할일",
      status: false,
      to_user_id: 1,
    },
    {
      id: 3,
      text: "3번 할일",
      status: true,
      to_user_id: 1,
    },
    {
      id: 4,
      text: "4번 할일",
      status: false,
      to_user_id: 1,
    },
    {
      id: 5,
      text: "5번 할일",
      status: true,
      to_user_id: 1,
    },
  ]);

  const [unCheckedList, setUnCheckedList] = useState<
    { id: number; text: string; status: boolean; to_user_id: number }[]
  >([
    {
      id: 1,
      text: "1번 할일",
      status: false,
      to_user_id: 1,
    },
    {
      id: 2,
      text: "2번 할일",
      status: false,
      to_user_id: 1,
    },
    {
      id: 4,
      text: "4번 할일",
      status: false,
      to_user_id: 1,
    },
  ]);

  const [checkedList, setCheckedList] = useState<
    { id: number; text: string; status: boolean; to_user_id: number }[]
  >([
    {
      id: 3,
      text: "3번 할일",
      status: true,
      to_user_id: 1,
    },
    {
      id: 5,
      text: "5번 할일",
      status: true,
      to_user_id: 1,
    },
  ]);

  const [todayCheckedList, setTodayCheckedList] = useState<
    { id: number; text: string; status: boolean; to_user_id: number }[]
  >([
    {
      id: 5,
      text: "5번 할일",
      status: true,
      to_user_id: 1,
    },
  ]);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [onDetail, setOnDetail] = useState<number>(-1);

  const getSelect = (id: number) => {
    let index: number = 0;

    FamilyMembers.forEach((value, i: number) => {
      if (value.id === id) {
        index = i;
        return false;
      }
    });

    setSelectedMember(FamilyMembers[index]);
    const tempMember = [...FamilyMembers];
    tempMember.splice(index, 1);
    setUnSelectedMember(tempMember);
    setIsModal(false);
  };

  const getModal = () => {
    setIsModal(true);
  }

  const getDetailSelect = (index: number) => {
    setOnDetail(index);
  }

  const detailOff = () => {
    setOnDetail(-1);
  }

  return (
    <div>
      <Header label="할 일 목록" back="true"></Header>
      {isModal && <ModalBack onClick={() => (setIsModal(false))}/>}
      {isModal && 
        <ModalDiv>
          {unSelectedMember.map((member: any) => (
            <ModalItem onClick={() => (getSelect(member.id))}>
              <ModalItemName>{member.name}</ModalItemName>
              <div><ModalItemImg src={member.image}/></div>
            </ModalItem>
          ))}
        </ModalDiv>}
      <CheckListViewBody>
        <SelectMember
          selectedMember={selectedMember}
          unSelectedMember={unSelectedMember}
          getModal={getModal}
        />
        <CheckListTitle>{selectedMember.name} 님의 체크리스트</CheckListTitle>
        {unCheckedList.map((item: any, i: number) => (
          <CheckItem item={item} index={i} key={item.id} getDetailSelect = {getDetailSelect} detailOff = {detailOff} onDetail={onDetail} />
        ))}
        {!viewMore &&
          todayCheckedList.map((item: any, i: number) => (
            <CheckItem item={item} index={i + unCheckedList.length} key={item.id} getDetailSelect = {getDetailSelect} detailOff = {detailOff} onDetail={onDetail} />
          ))}
        {viewMore &&
          checkedList.map((item: any, i: number) => (
            <CheckItem item={item} index={i + todayCheckedList.length + unCheckedList.length } key={item.id} getDetailSelect = {getDetailSelect} detailOff = {detailOff} onDetail={onDetail} />
          ))}
        {!viewMore && (
          <ViewMore onClick={() => setViewMore(true)}>+ 더보기</ViewMore>
        )}
      </CheckListViewBody>
    </div>
  );
}

export default ReadChecklist;
