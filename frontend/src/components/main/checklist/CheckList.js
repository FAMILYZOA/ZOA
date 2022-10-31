import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import CheckListList from "./CheckListList";
import { useNavigate } from "react-router-dom";

const CheckListNameWrapper = styled.div`
  color: #ff787f;
  font-weight: bold;
`;

const CheckListPlusButton = styled.div`
  font-size: x-large;
  border-radius: 50%;
  cursor: pointer;
  color:  #ff787f;
`

const CheckListWrapper = styled.div`
  border-radius: 12px;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 16px 0 16px;
`

const CheckList = () => {
  
  const navigate = useNavigate();

  return(
    <>
      <div>
        <div style={{display: "flex", justifyContent: "space-between", width: "80%"}}>
          <CheckListNameWrapper style={{margin: "0px 0px 0px 20px"}}>체크리스트</CheckListNameWrapper>
          <CheckListPlusButton onClick={() => navigate("/checklist")}>
            <FaPlusCircle size="24"/>
          </CheckListPlusButton>
      </div>
      <div>
        <CheckListList/>
      </div>
      </div>
    </>
  )
};

export default CheckList;
