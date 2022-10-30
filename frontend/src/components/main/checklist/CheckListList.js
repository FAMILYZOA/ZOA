import CheckListItem from "./CheckListItem";
import CheckListDetail from "./CheckListDetail";
import { useEffect } from "react";
import axios from "axios";

const CheckListList = () => {


    useEffect(() => 
        axios({
            method: "get",
            url: "https://k7b103.p.ssafy.io/api/v1/checklist/22",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))  
    );

  return(
    <>
        {/* <div style={{display: "flex"}}>
          <CheckListNameWrapper> 체크리스트</CheckListNameWrapper>
          <CheckListPlusButton onClick={() => navigate("/checklist")}>
            <FaPlusCircle size="24"/>
          </CheckListPlusButton>
        </div> */}
        {/* <CheckListWrapper> */}
            <CheckListItem/>
            <CheckListItem/>
            <CheckListItem/>
            <CheckListDetail/>
        {/* </CheckListWrapper> */}
    </>
  )
};

export default CheckListList;
