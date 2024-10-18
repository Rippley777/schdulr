import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./calendar.css";
import { filterDays, filterTimes } from "../utils";

type MonthTimeCalendarProps = {
  appointments?: any;
  onHandleUpdate: Dispatch<SetStateAction<Date | null>>;
};

const MonthTimeCalendar: React.FC<MonthTimeCalendarProps> = ({
  appointments,
  onHandleUpdate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    console.log("1234", startDate);

    onHandleUpdate?.(startDate);
  }, [onHandleUpdate, startDate]);

  return (
    <div className="">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        monthsShown={1}
        filterTime={(time) => filterTimes(time, appointments)}
        filterDate={(time) => filterDays(time, appointments)}
        timeIntervals={15}
        setDefaultTime={18}
        showTimeSelect
        inline
      />
    </div>
  );
};

export default MonthTimeCalendar;
