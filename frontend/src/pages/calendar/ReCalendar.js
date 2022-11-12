import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './ReCalendar.css'
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';

const ReCalendar = () => {
  const [date, setDate] = useState(new Date());
  const token = useAppSelector((state) => state.token.access)
  const [openModal, setOpenModal] = useState(false);


  // 데이터 가져와서 마킹하기
  const [monthList, setMonthList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/calendar/schedule/2022-11`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setMonthList([...res.data])
    }).catch((err) => {
      console.log(err.response);
    });
  }, []);
  console.log("월별 일정 조회", monthList);

  return (
    <>
    <div className='app'>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}/>
      </div>
    </div>
    </>
  )
};

export default ReCalendar;