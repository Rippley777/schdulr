import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Page from "../../components/page";
import MonthTime from "./monthTime";
import ScheduleForm from "./scheduleForm";
import { useAppointments } from "../../hooks/useAppointments";

const CalendarPage: React.FC = () => {
  const { data: appointments, isLoading, error } = useAppointments();
  console.log({ appointments });

  const [apptDate, setApptDate] = useState<Date | null>(new Date());

  return (
    <Page bodyStyles="flex flex-col items-center">
      {!isLoading && !error && (
        <div className="w-full h-3/4">
          <MonthTime onHandleUpdate={setApptDate} appointments={appointments} />
        </div>
      )}
      <ScheduleForm date={apptDate} />
      {/* {apptDate && <div>{apptDate.toLocaleDateString()}</div>} */}
      {apptDate && <div>{apptDate.toLocaleTimeString()}</div>}
    </Page>
  );
};

export default CalendarPage;
