import * as React from "react";
import { useState } from "react";

const DateSelector = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dateFormat = (date:Date) => {
    let year = date.getFullYear;
    let month = date.getMonth;
    return "asdf";
  }
  return (
    <div>
      <div>
        <div>전날</div>
        <div><p>{dateFormat(date)}</p></div>
        <div>다음날</div>
      </div>
    </div>
  );
};

const ScrumCreate = () => {
  return (
    <div>
      <div>헤더 자리</div>
      <div>
        <DateSelector />
        <div>
          나의 기분
          <div>오늘의 나는?</div>
          <div>이모지</div>
        </div>
        <div>
          어제 한 일<div>어제 뭐 했더라?</div>
          <div>입력 창</div>
        </div>
        <div>
          가족들에게 할 말<div> 가족들에게 한 마디!</div>
          <div>입력 창</div>
        </div>
        <div>완료 버튼</div>
      </div>
      <div>푸터 자리</div>
    </div>
  );
};

export default ScrumCreate;
