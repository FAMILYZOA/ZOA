import styled from "styled-components";
import CheckListItem from "./CheckListItem";
import CheckListDetail from "./CheckListDetail";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useSelector } from "react-redux";

const CheckListWrapper = styled.div`
  border-radius: 12px;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 16px 0 16px;
`

const CheckListList = () => {

  const [list, setList] = useState([]);
  const accessToken = useAppSelector((state) => state.token.access);
  const user = useSelector((state) => state.user);
  console.log(user)

  useEffect(() => {
    axios({
      method: "get",
        url: "https://k7b103.p.ssafy.io/api/v1/checklist/22",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((res) => {
      setList([...res.data])
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return(
    <>
        {/* <div style={{display: "flex"}}>
          <CheckListNameWrapper> 체크리스트</CheckListNameWrapper>
          <CheckListPlusButton onClick={() => navigate("/checklist")}>
            <FaPlusCircle size="24"/>
          </CheckListPlusButton>
        </div> */}
        <CheckListWrapper>
          if (list.length == 0)
            {list.map((item, idx) => (
              <CheckListItem
                {...item}
                key={idx}
              />
            ))}
            <CheckListDetail/>
        </CheckListWrapper>
    </>
  )
};

export default CheckListList;
