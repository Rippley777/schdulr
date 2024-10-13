import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./calendar.css";
import { filterDays, filterTimes } from "../utils";

type MonthTimeCalendarProps = {
  onHandleUpdate: Dispatch<SetStateAction<Date | null>>;
};

const MonthTimeCalendar: React.FC<MonthTimeCalendarProps> = ({
  onHandleUpdate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    onHandleUpdate?.(startDate);
  }, [onHandleUpdate, startDate]);

  return (
    <div className="">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        monthsShown={1}
        filterTime={filterTimes}
        filterDate={filterDays}
        timeIntervals={15}
        setDefaultTime={18}
        showTimeSelect
        inline
      />
    </div>
  );
};

export default MonthTimeCalendar;
