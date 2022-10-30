import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import CheckListList from "./CheckListList";

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
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return(
    <>
    <div>
        <div style={{display: "flex", justifyContent: "space-between", width: "80%"}}>
          <CheckListNameWrapper style={{margin: "0px 0px 0px 20px"}}>체크리스트</CheckListNameWrapper>
          {/* 플러스 버튼에 나중에 체크리스트 추가하는 페이지 걸어놓기 */}
          <CheckListPlusButton>
            <FaPlusCircle size="24"/>
          </CheckListPlusButton>
      </div>
      <div>
          <CheckListWrapper>
            <CheckListList></CheckListList>
          </CheckListWrapper>
      </div>
      </div>
    </>
  )
};

export default CheckList;
