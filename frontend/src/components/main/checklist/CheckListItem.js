import styled from "styled-components";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { useState } from "react";

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
    props.active ? "line-through #808080" : "line-through transparent"};
  color: ${(props) => (props.active ? "#808080" : "black")};
  margin: auto 8px;
  transition: color 0.5s;
`;

const CheckListItem = ({ item, checked }) => {
  // 체크 했을 때 스타일 설정
  const token = useAppSelector((state) => state.token.access);
  const [isDisplay, setIsDisplay] = useState(item.status);

  // 체크리스트 완료 api
  const onPutCheckList = () => {
    setIsDisplay(!item.status);
    setTimeout(() => {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_BACK_HOST}/checklist/detail/${item.id}`,
        data: {
          status: !item.status,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        checked();
      });
    }, 600);
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
      <TextBox active={isDisplay}>{item.text}</TextBox>
    </Container>
  );
};

export default CheckListItem;
