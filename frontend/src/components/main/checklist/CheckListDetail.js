import styled from "styled-components";
import { FaPlusSquare } from "react-icons/fa";

const ButtonWrapper = styled.div`
  color: #ff787f;
  border-radius: 12px;
  margin: 4px 12px 4px 12px;
`

const CheckListDetail = () => {

  return(
    <>
      <ButtonWrapper>
        <div style={{display: "flex"}}>
          <div style={{margin: "0px 12px 0px 0px"}}>
            <FaPlusSquare/>
          </div>
          <div>
            더보기
          </div>
        </div>
      </ButtonWrapper>
    </>
  )
};

export default CheckListDetail;
