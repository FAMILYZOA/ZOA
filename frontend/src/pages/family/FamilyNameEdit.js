import { useEffect } from "react";
import styled from "styled-components";
import FamilyMemberEdit from "../../components/family/FamilyMemberEdit";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAppSelector } from "../../app/hooks";

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

const Containter = styled.div`
  margin: 5%;
`;
const Info = styled.div`
  margin: 5vh 0;
`;

const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  font-weight: bold;
  margin-left: 4%;
`;

const ListWrapper = styled.div``;

function FamilyNameEdit() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/family/manage");
  };
  const familyId = useAppSelector(state => state.family.id);

  useEffect(() => {
    if (familyId < 0) {
      navigate("/");
    }
  }, [])
  
  return (
    <>
      <HeaderBox>
        <Icon onClick={navigateToHome}>
          <IoIosArrowBack size="24" />
        </Icon>
        <HeaderLabel>λ©€λ² κ΄λ¦¬</HeaderLabel>
        <div></div>
      </HeaderBox>
      <Containter>
        <Info> ππ»ββοΈ μ΄λ¦μ ν΄λ¦­ν΄μ κ°μ‘±μκ² λ³λͺμ λΆμ¬ν΄λ³΄μΈμ !</Info>
        <FamilyMembersTitle>
          <div>λ©€λ²</div>
        </FamilyMembersTitle>
        <ListWrapper>
          <FamilyMemberEdit />
        </ListWrapper>
      </Containter>
    </>
  );
}

export default FamilyNameEdit;
