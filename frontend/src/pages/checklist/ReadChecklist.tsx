import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectMember from "../../components/checklist/view/SelectMember";
import Header from "../../components/header";
import { useAppSelector } from "../../app/hooks";
import Tabs from "../../components/checklist/view/Tabs";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

interface modalBackProps {
  toggle?: boolean;
}

interface modalItemProps {
  index?: any;
  toggle?: any;
}

const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Icon = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;

const HeaderLabel = styled.div`
  font-size: 1.25em;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const CheckListViewBody = styled.div`
  padding: 5%;
`;
const CheckListTitle = styled.div`
  margin: 12px 8px;
  font-size: 1em;
  font-weight: bold;
`;

const ModalBack = styled.div<modalBackProps>`
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
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
  height: 75vh;
  overflow-y: scroll;
  z-index: 3;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ModalItem = styled.div<modalItemProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 4;
  margin-bottom: 1vh;
  margin-left: auto;
  animation: fadein-item 0.3s ease-in
    ${(props) => String(0.3 + props.index * 0.2)}s;
  -moz-animation: fadein-item 0.3s ease-in
    ${(props) => String(0.3 + props.index * 0.2)}s;
  -webkit-animation: fadein-item 0.3s ease-in
    ${(props) => String(0.3 + props.index * 0.2)}s;
  -o-animation: fadein-item 0.3s ease-in
    ${(props) => String(0.3 + props.index * 0.2)}s;
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
  margin-right: 0.6em;
  font-weight: 700;
  font-size: 0.8em;
`;
const ModalItemImg = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 1em;
  object-fit: fill;
`;

function ReadChecklist() {
  const userId = useAppSelector((state) => state.user.id);
  const userName = useAppSelector((state) => state.user.name);
  const userImage = useAppSelector((state) => state.user.image);
  const [isModal, setIsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    id: number;
    name: string;
    image: string;
    set_name: string;
  }>({
    id: userId,
    name: userName,
    image: userImage,
    set_name: "",
  }); // 선택된 인원
  const [unSelectedMember, setUnSelectedMember] = useState<
    { id: number; name: string; image: string; set_name: string }[]
  >([]); // 선택되지 않은 인원
  const FamilyMembers = useAppSelector((state) => state.family.users);

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

  useEffect(() => {
    let index: number = 0;
    // 패밀리중 유저와 일치하는 index 탐색
    FamilyMembers.forEach((value, i: number) => {
      if (value.id === userId) {
        index = i;
        return false;
      }
    });
    setSelectedMember(FamilyMembers[index]);
    const tempMember = [...FamilyMembers];
    tempMember.splice(index, 1);
    setUnSelectedMember(tempMember);
  }, [FamilyMembers]);

  const getModal = () => {
    setIsModal(true);
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(-1);
  };
  const navigateToCreate = () => {
    navigate("/checklist/create");
  };

  return (
    <div>
      <HeaderBox>
        <Icon onClick={navigateToHome}>
          <IoIosArrowBack size="24" />
        </Icon>
        <HeaderLabel>할 일 목록</HeaderLabel>
        <Icon onClick={navigateToCreate}>
          <FiPlus size="24" />
        </Icon>
      </HeaderBox>
      {isModal && <ModalBack onClick={() => setIsModal(false)} />}
      {isModal && (
        <ModalDiv>
          {unSelectedMember.map((member: any, index: number) => (
            <ModalItem
              onClick={() => getSelect(member.id)}
              key={member.id}
              index={index}
            >
              <div>
                <ModalItemImg src={member.image} />
              </div>
              <ModalItemName>{member.name}</ModalItemName>
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
        <CheckListTitle>
          {selectedMember.set_name ? (
            <span style={{ color: "#FE9B7C" }}>
              {selectedMember.set_name} ({selectedMember.name})
            </span>
          ) : (
            <span style={{ color: "#FE9B7C" }}>{selectedMember.name}</span>
          )}
          님의 체크리스트
        </CheckListTitle>
        <Tabs current={selectedMember.id}></Tabs>
      </CheckListViewBody>
    </div>
  );
}

export default ReadChecklist;
