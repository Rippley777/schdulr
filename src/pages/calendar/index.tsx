import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Page from "../../components/page";
import "./calendar.css";
import { filterDays, filterTimes } from "./utils";

const CalendarPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <Page bodyStyles="flex flex-col items-center">
      <div className="w-[80vh]">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={1}
          filterTime={filterTimes}
          filterDate={filterDays}
          showTimeSelect
          inline
        />
      </div>
      {startDate && <div>{startDate.toLocaleDateString()}</div>}
      {startDate && <div>{startDate.toLocaleTimeString()}</div>}
    </Page>
  );
};

export default CalendarPage;
