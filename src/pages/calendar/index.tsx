import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Page from "../../components/page";
import MonthTime from "./monthTime";

const CalendarPage: React.FC = () => {
  const [apptDate, setApptDate] = useState<Date | null>(new Date());
  // const;

  return (
    <Page bodyStyles="flex flex-col items-center">
      <div className="w-full">
        <MonthTime onHandleUpdate={setApptDate} />
      </div>
      {apptDate && <div>{apptDate.toLocaleDateString()}</div>}
      {apptDate && <div>{apptDate.toLocaleTimeString()}</div>}
    </Page>
  );
};

export default CalendarPage;
