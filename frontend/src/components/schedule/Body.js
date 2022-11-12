import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dates from './Dates';
import axios from 'axios';

const Body = (props) => {
  const { totalDate, today, month, year } = props;
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

  const [holiday, setHoliday] = useState([0]);

  //today
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;


  // useEffect(() => {
  //   runAxios();
  // }, [month]);
  return (
    <Form>
      {totalDate.map((elm, idx) => {
        return (
          <Dates
            key={idx}
            idx={idx}
            lastDate={lastDate}
            firstDate={firstDate}
            elm={elm}
            findToday={findToday === idx && month === getMonth && findToday}
            month={month}
            year={year}
            holiday={holiday.item}
          ></Dates>
        );
      })}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
export default Body;


// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Dates from './Dates';
// import axios from 'axios';

// const Body = ({ totalDate, today, month, year, flag }) => {
//   const lastDate = totalDate.indexOf(1);
//   const firstDate = totalDate.indexOf(1, 7);


//   //today
//   const findToday = totalDate.indexOf(today);
//   const getMonth = new Date().getMonth() + 1;

//   return (
//     <Form>
//       {totalDate.map((elm, idx) => {
//         return (
//           <Dates
//             key={idx}
//             idx={idx}
//             lastDate={lastDate}
//             firstDate={firstDate}
//             elm={elm}
//             findToday={findToday === idx && month === getMonth && findToday}
//             month={month}
//             year={year}
//             flag={flag}
//           ></Dates>
//         );
//       })}
//     </Form>
//   );
// };

// const Form = styled.div`
//   display: flex;
//   flex-flow: row wrap;
// `;
// export default Body;
