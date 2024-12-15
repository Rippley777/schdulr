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
    <Page>
      {!isLoading && !error ? (
        <div className="w-full h-3/4 flex flex-col lg:flex-row justify-around">
          <div className="lg:basis-2/3">
            <MonthTime
              onHandleUpdate={setApptDate}
              appointments={appointments}
            />
          </div>
          <div className="flex justify-center lg:basis-1/3">
            <ScheduleForm date={apptDate} />
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </Page>
  );
};

export default CalendarPage;
