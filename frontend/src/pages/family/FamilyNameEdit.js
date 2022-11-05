import styled from "styled-components";
import FamilyMemberEdit from "../../components/family/FamilyMemberEdit";
import Header from "../../components/header";

const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4.5vh 0 2vh;
  font-size: 2vh;
  font-weight: bold;
  margin-left: 4%;
`;

const ListWrapper = styled.div`
  margin-left: 4%;
`

const FamilyNameEdit = () => {

  return (
    <>
      <Header label="멤버관리"/>
      <FamilyMembersTitle>
          <div>멤버</div>
        </FamilyMembersTitle>
        <ListWrapper>
          <FamilyMemberEdit/>
        </ListWrapper>
    </>
  )
};

export default FamilyNameEdit;