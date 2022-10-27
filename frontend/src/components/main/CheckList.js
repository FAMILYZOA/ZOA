import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai"

const CheckListNameWrapper = styled.div`
  color: #ff787f;
  font-weight: bold;
`;

const CheckListPlusButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: white;
  background: linear-gradient(to left, #FE9B7C, #fec786);
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`

const CheckListWrapper = styled.div`
  border: 4px solid;
  border-radius: 12px;
  width: 80vw;
`

const CheckList = () => {
  
  return(
    <>
      <div>
        <div style={{display: "flex"}}>
          <CheckListNameWrapper> 체크리스트</CheckListNameWrapper>
          <CheckListPlusButton>
            <FaPlusCircle size="24"/>
          </CheckListPlusButton>
      </div>
      <div>
        <CheckListWrapper>
          리스트 쫘라락
        </CheckListWrapper>
      </div>
      </div>
    </>
  )
};

export default CheckList;