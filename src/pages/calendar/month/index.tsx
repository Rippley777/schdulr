import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./calendar.css";
import { filterDaysWithAppointments } from "../utils";
import { Appointment } from "../../../types";

type MonthTimeCalendarProps = {
  appointments?: Appointment[];
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
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      monthsShown={1}
      filterDate={(time) => filterDaysWithAppointments(time, appointments)}
      inline
    />
  );
};

export default MonthTimeCalendar;
