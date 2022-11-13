import React, { useState } from "react";
import styled from "styled-components";
import MonthlyCalendar from "../../components/calendar/MonthlyCalendar";

const Calendar = () => {
  
  // 날짜 지정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const setYearAndMonth = (y, m) => {
    setDate({ year: y, month: m, day: date.day });
  };

  const setNewDate = (y, m, d) => {
    setDate({ year: y, month: m, day: d });
  };

  return(
    <>
      <MonthlyCalendar
        year={date.year}
        month={date.month}
        day={date.day}
        setYearAndMonth={setYearAndMonth}
      />
    </>
  )
};

export default Calendar;