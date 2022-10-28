import styled from "styled-components";

const ScrumWrapper = styled.div`
  background-color: transparent;
  margin: 12px;
`

const ItemWrapper = styled.div`
  background-color: #eefbef;
`

const ProfileWrapper = styled.div`
  color: red;
`

const ScrumItem = () => {

  return(
    <>
      <ScrumWrapper style={{display: "flex"}}>
        <ProfileWrapper>ㅇㅇ</ProfileWrapper>
        <ItemWrapper>
          <div>
           🙋‍♂️ 오늘은 금요일
          </div>
          <div>
           📢 하지만 내겐 많은 잔업이 있소
          </div>
        </ItemWrapper>
      </ScrumWrapper>
    </>
  )
};

export default ScrumItem;