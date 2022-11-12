import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';

const Dates = (props) => {
  const { lastDate, firstDate, elm, findToday, month, year, idx } =
    props;

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput('');
    setOpenModal(false);
  };

  const [content, setContent] = useState({
    title: "일정등록 테스트",
    color: "blue",
    important_mark: true,
    writer: 1,
    start_date: "2022-11-11",
    end_date: "2022-11-11",
    family: 1
  });

  const token = useAppSelector((state) => state.token.access);
  const onPostCalendar = () => {
    axios ({
      method: "post",
      url: `${process.env.REACT_APP_BACK_HOST}/calendar/schedule/2022-11-11`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        title: "일정등록 테스트",
        color: "blue",
        important_mark: true,
        writer: 1,
        start_date: "2022-11-11",
        end_date: "2022-11-11",
        family: 1
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err.response);
    })
  }

  return (
    <>
      <Form
        onDoubleClick={() => {
          setOpenModal(true);
        }}
      >
        <DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          <TodayCSS findToday={findToday}>{elm}</TodayCSS>
        </DateNum>
        {openModal && (
          <Modal
            elm={elm}
            month={month}
            year={year}
            registEvent={registEvent}
            setOpenModal={setOpenModal}
            openModal={openModal}
            userInput={userInput}
            setUserInput={setUserInput}
            onPostCalendar={onPostCalendar}
          />
        )}
        {Boolean(evtList[0]) && (
          <Lists>
            {evtList.map((list, index) => {
              return (
                list.slice(0, list.indexOf('_')) === dateKey && (
                  <List
                    key={index}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {list.slice(list.indexOf('_') + 1, list.length)}
                  </List>
                )
              );
            })}
          </Lists>
        )}
      </Form>
    </>
  );
};
const Form = styled.div`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 8);
  height: 9vw;
  text-align: right;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
    background-color: #f5f5f5;
  }
`;

const DateNum = styled.div`
  padding: 1vw 0.9vw 0 0;
  ${(props) => props.idx < props.lastDate && `color: #969696;`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696;
  `};
`;

const TodayCSS = styled.span`
  ${(props) =>
    props.findToday &&
    ` position: relative;
    padding: .5vw;
    border-radius: 50%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #FFFFFF;
    background-color:red
 `}
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const List = styled.span`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  background-color: #f7ced9;
  border-radius: 5px;
`;

export default Dates;


// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Modal from './Modal';

// const Dates = ({ lastDate, firstDate, elm, findToday, month, year, idx, flag }) => {

//   const [userInput, setUserInput] = useState({});
//   const [openModal, setOpenModal] = useState(false);

//   return (
//     <>
//       <Form
//         onDoubleClick={() => {
//           setOpenModal(true);
//         }}
//       >
//         <DateNum
//           idx={idx}
//           lastDate={lastDate}
//           firstDate={firstDate}
//           findToday={findToday}
//         >
//           <TodayCSS findToday={findToday}>{elm}</TodayCSS>
//         </DateNum>
//         {openModal && (
//           <Modal
//             elm={elm}
//             month={month}
//             year={year}
//             setOpenModal={setOpenModal}
//             openModal={openModal}
//             userInput={userInput}
//             setUserInput={setUserInput}
//           />
//         )}
//       </Form>
//     </>
//   );
// };
// const Form = styled.div`
//   width: calc(100% / 8);
//   height: 9vw;
//   text-align: center;
//   border-bottom: 1px solid #e4e3e6;
//   border-left: 1px solid #e4e3e6;
//   :nth-child(7n + 1),
//   :nth-child(7n) {
//     color: #969696;
//     background-color: #f5f5f5;
//   }
// `;

// const DateNum = styled.div`
//   ${(props) => props.idx < props.lastDate && `color: #969696;`};
//   ${(props) =>
//     props.firstDate > 0 &&
//     props.idx > props.firstDate - 1 &&
//     `
//     color: #969696;
//   `};
// `;

// const TodayCSS = styled.span`
//   ${(props) =>
//     props.findToday &&
//     ` position: relative;
//     border-radius: 50%;
//     font-weight: 700;
//     color: #FFFFFF;
//     background-color:red
//  `}
// `;

// export default Dates;

