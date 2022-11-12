import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';

const Head = (props) => {
  const { year, month, setMonth } = props;

  //redux값 불러오기
  const token = useAppSelector((state) => state.token.access)

  // 일정 정보 담기
  const [monthList, setMonthList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/calendar/schedule/${year}-${month}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setMonthList([...res.data]);
    }).catch((err) => {
      console.log(err.response);
    });
  }, [month]);
  console.log("월별 일정 조회", monthList);


  return (
    <Form>
      <Nav>
        <BtnBox>
          <Btn onClick={() => setMonth(month - 1)}>&lt;</Btn>
        </BtnBox>
        <Year>
          {year}년 {month}월
        </Year>
        <BtnBox>
          <Btn onClick={() => setMonth(month + 1)}>&gt;</Btn>
        </BtnBox>
      </Nav>
      <Days>
        {DAY.map((elm, idx) => {
          return <Day key={idx}>{elm}</Day>;
        })}
      </Days>
    </Form>
  );
};

const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  border: 2px solid #e4e3e6;
  border-radius: 2px;
`;
const Nav = styled.section`
  margin:.7vw;
  display: flex;
`;
const Year = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
const BtnBox = styled.div`
  margin: 0 1vw 0 0;
  width: 6vw;
`;
const Btn = styled.div`
  padding: 0.2vw 0.2vw 0.1vw;
  width: ${(props) => {
    return props.width || '1.3vw';
  }};
  border: 0.5px solid #e4e3e6;
  border-radius: 5px;
  text-align: center;
  font-size: 0.78rem;
  cursor: pointer;
`;
const Days = styled.div`
  display: flex;
  margin-bottom: 0.5vw;
`;
const Day = styled.div`
  padding-right: 1.5vw;
  width: calc(100% / 8);
  text-align: center;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
  }
`;

const DAY = ['일', '월', '화', '수', '목', '금', '토'];
export default Head;


// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const Head = ({ date, onHandleBeforeMonth, onHandleAfterMonth, month }) => {

//   return (
//     <Form>
//       <Nav>
//         <BtnBox>
//           <Btn onClick={() => onHandleBeforeMonth()}>&lt;</Btn>
//             <Year>
//               {date.getFullYear()}년 {date.getMonth() + 1}월
//             </Year>
//           <Btn onClick={() => onHandleAfterMonth()}>&gt;</Btn>
//         </BtnBox>
//       </Nav>
//       <Days>
//         {DAY.map((elm, idx) => {
//           return <Day key={idx}>{elm}</Day>;
//         })}
//       </Days>
//     </Form>
//   );
// };

// const Form = styled.section`
//   display: flex;
//   flex-direction: column;
//   border: 2px solid #e4e3e6;
//   border-radius: 2px;
// `;
// const Nav = styled.section`
//   margin:.7vw;
// `;
// const Year = styled.div`
//   font-size: 2rem;
//   font-weight: 700;
// `;
// const BtnBox = styled.div`
//   display: flex;
// `;
// const Btn = styled.div`
//   padding: 0.2vw 0.2vw 0.1vw;
//   width: ${(props) => {
//     return props.width || '1.3vw';
//   }};
//   border: 0.5px solid #e4e3e6;
//   border-radius: 5px;
//   text-align: center;
//   font-size: 0.78rem;
//   cursor: pointer;
// `;
// const Days = styled.div`
//   display: flex;
// `;
// const Day = styled.div`
//   width: calc(100% / 8);
//   text-align: center;
//   :nth-child(7n + 1),
//   :nth-child(7n) {
//     color: #969696;
//   }
// `;

// const DAY = ['일', '월', '화', '수', '목', '금', '토'];
// export default Head;
