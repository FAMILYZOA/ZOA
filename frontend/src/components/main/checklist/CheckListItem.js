import styled from "styled-components";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 4px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.p`
  text-decoration: ${(props) =>
    props.active === true ? "line-through #808080" : null};
  color: ${(props) => (props.active === true ? "#808080" : "black")};
  margin: auto 8px;
`;

const CheckListItem = (item) => {
  // 체크 했을 때 스타일 설정
  let itemTextColor = "#000000";
  let textDecorationLine = "";

  if (item.status === true) {
    itemTextColor = "#808080";
    textDecorationLine = "line-through";
  }

  const token = useAppSelector((state) => state.token.access);

  // 체크리스트 완료 api
  const onPutCheckList = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BACK_HOST}/checklist/detail/${item.id}`,
      data: {
        status: !item.status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  };

  return (
    <Container>
      <IconBox
        onClick={() => {
          onPutCheckList(item.id);
        }}
      >
        {item.status === true ? (
          <FaCheckSquare size={16} color={"#FAD7D4"} />
        ) : (
          <FaRegSquare size={16} color={" #ff787f"} />
        )}
      </IconBox>
      {/* <TextBox active={item.active}>{item.text}</TextBox> */}
      <TextBox
        style={{ color: itemTextColor, textDecorationLine: textDecorationLine }}
      >
        {item.text}
      </TextBox>
    </Container>
  );
};

export default CheckListItem;
