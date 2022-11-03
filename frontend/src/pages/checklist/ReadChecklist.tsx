import React, { useEffect, useState } from "react";
import styled , { css } from "styled-components";
import SelectMember from "../../components/checklist/view/SelectMember";
import Header from "../../components/header";
import { CheckItem } from "../../components/checklist/view";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";

interface modalBackProps {
  toggle?: boolean;
}

interface modalItemProps {
  index?: any;
  toggle?: any;
}

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

const ModalBack = styled.div<modalBackProps>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: rgba(102, 102, 102, 0.5);
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalDiv = styled.div`
  position: absolute;
  top: 13vh;
  right: 2vh;
  z-index: 3;
`;
const ModalItem = styled.div<modalItemProps>`
  display: flex;
  align-items: center;
  z-index: 4;
  margin-bottom: 1vh;
  margin-left: auto;
  animation: fadein-item 0.3s ease-in ${(props) => (String(0.3 + props.index * 0.2))}s;
  -moz-animation: fadein-item 0.3s ease-in ${(props) => (String(0.3 + props.index * 0.2))}s;
  -webkit-animation: fadein-item 0.3s ease-in ${(props) => (String(0.3 + props.index * 0.2))}s;
  -o-animation: fadein-item 0.3s ease-in ${(props) => (String(0.3 + props.index * 0.2))}s;
  animation-fill-mode: backwards;
  -webkit-animation-fill-mode: backwards;
  -o-animation-fill-mode: backwards;
  @keyframes fadein-item {
    from {
      opacity: 0;
      transform: translate(0, -50%);
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein-item {
    from {
      opacity: 0;
      transform: translate(0, -50%);
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein-item {
    from {
      opacity: 0;
      transform: translate(0, -50%);
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein-item {
    from {
      opacity: 0;
      transform: translate(0, -50%);
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalItemName = styled.div`
  margin-right: 1vh;
  font-weight: 700;
  font-size: 2vh;
`;
const ModalItemImg = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 4vh;
  object-fit: fill;
`;

function ReadChecklist() {
  const [isModal, setIsModal] = useState(false);
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
    { id: number; name: string; image: string; set_name: string }[]
  >([]); // 선택되지 않은 인원
  const FamilyMembers = useAppSelector((state) => state.family.users);
  const [checkList, setCheckList] = useState<
    {
      id: number;
      text: string;
      status: boolean;
      photo: string;
      created_at: string;
      to_user_id: number[];
    }[]
  >([]);
/* 
----- 체크리스트 api 완성시 다시 활성화 -----
*/
  // const [unCheckedList, setUnCheckedList] = useState<
  //   {
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }[]
  // >([]);

  // const [checkedList, setCheckedList] = useState<
  //   {
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }[]
  // >([]);

  // const [todayCheckedList, setTodayCheckedList] = useState<
  //   {
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }[]
  // >([]);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [onDetail, setOnDetail] = useState<number>(-1);

  const accessToken = useAppSelector((state) => state.token.access);

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
    setIsModal(false);
  };

  const refreshCheckList = (to_users_id: number) => { // 체크리스트 갱신 함수
    if (to_users_id >= 0){
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACK_HOST}/checklist/${to_users_id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setCheckList(res.data.results);
          console.log(res.data.results);
          console.log("get checklist success");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    setSelectedMember(FamilyMembers[0]);
    const tempMember = [...FamilyMembers];
    tempMember.splice(0, 1);
    setUnSelectedMember(tempMember);
    refreshCheckList(FamilyMembers[0].id);
  },[FamilyMembers]);

  useEffect(() => {
    refreshCheckList(selectedMember.id);
  },[selectedMember])

  // useEffect(() => { // 체크리스트 분류
  //   const tempCheckedList: Array<{
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }> = [];
  //   const tempUnCheckedList: Array<{
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }> = [];
  //   const tempTodayCheckedList: Array<{
  //     id: number;
  //     text: string;
  //     status: boolean;
  //     photo: string;
  //     created_at: string;
  //     to_user_id: number[];
  //   }> = [];

  //   checkList.forEach((value) => {
  //     if (value.status) {
  //       tempCheckedList.push(value);
  //     } else {
  //       tempUnCheckedList.push(value);
  //     }
  //   });
  //   setCheckedList(tempCheckedList);
  //   setUnCheckedList(tempUnCheckedList);
  // }, [checkList]);

  const getModal = () => {
    setIsModal(true);
  };

  const getDetailSelect = (index: number) => {
    setOnDetail(index);
  };

  const detailOff = () => {
    setOnDetail(-1);
  };

  const checkBoundary = 5 // 임시 더보기 한계선

  return (
    <div>
      <Header label="할 일 목록" back="true"></Header>
      {isModal && <ModalBack onClick={() => setIsModal(false)} />}
      {isModal && (
        <ModalDiv>
          {unSelectedMember.map((member: any, index: number) => (
            <ModalItem onClick={() => getSelect(member.id)} key={member.id} index={index}>
              <ModalItemName>{member.name}</ModalItemName>
              <div>
                <ModalItemImg src={member.image} />
              </div>
            </ModalItem>
          ))}
        </ModalDiv>
      )}
      <CheckListViewBody>
        <SelectMember
          selectedMember={selectedMember}
          unSelectedMember={unSelectedMember}
          getModal={getModal}
        />
        <CheckListTitle>{selectedMember.name} 님의 체크리스트</CheckListTitle>
        {/* {unCheckedList.map((item: any, i: number) => (
          <CheckItem
            item={item}
            index={i}
            key={item.id}
            getDetailSelect={getDetailSelect}
            detailOff={detailOff}
            onDetail={onDetail}
          />
        ))}
        {!viewMore &&
          todayCheckedList.map((item: any, i: number) => (
            <CheckItem
              item={item}
              index={i + unCheckedList.length}
              key={item.id}
              getDetailSelect={getDetailSelect}
              detailOff={detailOff}
              onDetail={onDetail}
            />
          ))}
        {viewMore &&
          checkedList.map((item: any, i: number) => (
            <CheckItem
              item={item}
              index={i + todayCheckedList.length + unCheckedList.length}
              key={item.id}
              getDetailSelect={getDetailSelect}
              detailOff={detailOff}
              onDetail={onDetail}
            />
          ))} */}
        {(viewMore || checkList.length <= checkBoundary) && checkList.map((item: any, i: number) => (
          <CheckItem
            item={item}
            selectedMember={selectedMember}
            index={i}
            key={item.id}
            getDetailSelect={getDetailSelect}
            detailOff={detailOff}
            onDetail={onDetail}
            refreshCheckList={refreshCheckList}
          />
        ))}
        {(!viewMore && checkList.length > checkBoundary) && (checkList.slice(0,checkBoundary)).map((item: any, i: number) => (
          <CheckItem
            item={item}
            selectedMember={selectedMember}
            index={i}
            key={item.id}
            getDetailSelect={getDetailSelect}
            detailOff={detailOff}
            onDetail={onDetail}
            refreshCheckList={refreshCheckList}
          />
        ))}
        {(viewMore || checkList.length <= checkBoundary) && (
          <ViewMore onClick={() => setViewMore(false)}>- 닫기</ViewMore>
        )}
        {(!viewMore && checkList.length > checkBoundary) && (
          <ViewMore onClick={() => setViewMore(true)}>+ 더보기</ViewMore>
        )}
      </CheckListViewBody>
    </div>
  );
}

export default ReadChecklist;
