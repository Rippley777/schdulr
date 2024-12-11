import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Page from "../../components/page";
import Month from "./month";
import ScheduleForm from "./scheduleForm";
import { useAppointments } from "../../hooks/useAppointments";

const CalendarPage: React.FC = () => {
  const { data: appointments, isLoading, error } = useAppointments();
  console.log({ appointments });

  const [apptDate, setApptDate] = useState<Date | null>(new Date());

  return (
    <Page bodyStyles="flex flex-col items-center">
      {!isLoading && !error && (
        <div className="w-full h-3/4 flex flex-col md:flex-row">
          <div className="w-2/3">
            <Month onHandleUpdate={setApptDate} appointments={appointments} />
          </div>
          <div className="m-10">
            <ScheduleForm date={apptDate} />
          </div>
        </div>
      )}

      {/* {apptDate && <div>{apptDate.toLocaleDateString()}</div>} */}
      {apptDate && <div>{apptDate.toLocaleTimeString()}</div>}
    </Page>
  );
};

export default CalendarPage;
