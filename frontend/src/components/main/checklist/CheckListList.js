import styled from "styled-components";
import CheckListItem from "./CheckListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router';

const CheckListWrapper = styled.div`
  border-radius: 12px;
  width: 90%;
  height: calc(100vh - 450px);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const ListBox = styled.div`
  padding: 18px 8px;
  margin-top: 2%;;
`
const ViewMoreBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color:#ff787f;
  margin: auto 8px;
  font-size: 18px;
`;

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh - 520px) / 2 );
`;

const NoListText = styled.p`
  font-size: 18px;
  margin: 4px 8px;
  text-align: center;

`

const UserImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 30px;
  margin-left: 4%;
  margin-top: 10%;
  margin-right: 4%;
`;

const CheckListList = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token.access);
  const user = useAppSelector((state) => state.user.id);
  const userImg = useAppSelector((state) => state.user.image)
  const [list, setList] = useState([]);

  useEffect(() => {
    if (user >= 0 ){
      axios({
        method: "get",
          url: `https://k7b103.p.ssafy.io/api/v1/checklist/${user}`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
      })
      .then((res) => {
        setList([...res.data.results])
        setList(
          res.data.results.map((item)=>(
            item ? {...item, active:false} : list
          ))
        )
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [user, list]);

  const viewMore = () => {
    navigate("/checklist");
  }

  return (
    <CheckListWrapper>
        <UserImg src={userImg}/>
        <ListBox>
          {list.length !== 0 ? (
            <div>
              {list.map((item, idx) => (
                <CheckListItem {...item} key={idx} />
                ))}
            </div>
          ) : (
            <NoList>
            <NoListText>
              등록된 할 일이 없습니다.
              <br />
              할 일을 등록해보세요🙂
            </NoListText>
            </NoList>
          )}
          <ViewMoreBox>
            <IconBox onClick={viewMore}>
              <FaPlusSquare size={16} color={" #ff787f"} />
            </IconBox>
            <Text onClick={viewMore}>더보기</Text>
          </ViewMoreBox>
        </ListBox>
    </CheckListWrapper>
  );
};

export default CheckListList;
