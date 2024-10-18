import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCreateAppointment } from "../../hooks/useAppointments";

type IFormInputs = {
  date: Date;
  email: string;
  localDate: string;
  localTime: string;
  //   guest: boolean;
};

interface ScheduleForm {
  date: Date | null;
}

const ScheduleForm: React.FC<ScheduleForm> = ({ date }) => {
  const createMutation = useCreateAppointment();

  const { handleSubmit, setValue, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      localDate: date?.toLocaleDateString(),
      localTime: date?.toLocaleTimeString(),
      email: "",
      //   guest: false,
    },
  });

  useEffect(() => {
    if (date) {
      setValue("date", date);
      setValue("localDate", date.toLocaleDateString());
      setValue("localTime", date.toLocaleTimeString());

      reset({
        date,
        localDate: date.toLocaleDateString(),
        localTime: date.toLocaleTimeString(),
      });
    }
  }, [date, reset, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const apptRequest = {
      date: data.date.toISOString(),
      calendarId: "test",
      email: data.email,
      title: "New Appointment",
      userId: "0",
    };
    console.log("making req ", apptRequest);

    createMutation.mutate(apptRequest);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {date ? (
        <>
          Date:
          <Controller
            name="localDate"
            control={control}
            disabled={true}
            render={({ field }) => <input {...field} />}
          />
          Time:
          <Controller
            name="localTime"
            control={control}
            disabled={true}
            render={({ field }) => <input {...field} />}
          />
        </>
      ) : null}
      <div>
        {/* Use guest account?
        <Controller
          name="guest"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <input
              {...field}
              type="checkbox"
              checked={field.value}
              value="guest"
            />
          )}
        /> */}
        Email:
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default ScheduleForm;
