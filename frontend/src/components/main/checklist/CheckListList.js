import styled from "styled-components";
import CheckListItem from "./CheckListItem";
import CheckListDetail from "./CheckListDetail";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";

const CheckListWrapper = styled.div`
  border-radius: 12px;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 16px 0 16px;
`

const CheckListList = ({list}) => {

  // const token = useAppSelector((state) => state.token.access);
  // const user = useAppSelector((state) => state.user.id);

  // useEffect(() => {
    
  //   axios({
  //     method: "get",
  //       url: `https://k7b103.p.ssafy.io/api/v1/checklist/${user}`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //   })
  //   .then((res) => {
  //     setList([...res.data])
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [user]);

  useEffect(() => {
    console.log(list);
  }, [list])

  return(
    <>
        <CheckListWrapper>
          {list.length !== 0 ? (
            <div>
              {list.slice(0, 3).map((item, idx) => (
                <CheckListItem {...item} key={idx}/>
              ))}
            </div>
          ) : '등록된 체크리스트가 없습니다' }
            <CheckListDetail/>
        </CheckListWrapper>
    </>
  )
};

export default CheckListList;
