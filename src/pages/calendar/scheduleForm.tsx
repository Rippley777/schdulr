import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useCreateAppointment } from "../../hooks/useAppointments";
import {
  FormInputCheckboxGrid,
  FormInputGrid,
  FormInputTwoCheckboxGrid,
  Input,
} from "../../components/form/input";

type IFormInputs = {
  date: Date;
  email: string;
  phone: string;
  localDate: string;
  localTime: string;
  description: string;
  serviceRequested: boolean;
  preferredContact?: string;
  onsite?: boolean;
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
      description: "",
      phone: "",
      preferredContact: undefined,
      onsite: undefined,
      serviceRequested: undefined,
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
      description: data.description,
      phone: data.phone,
      serviceRequested: data.serviceRequested,
      preferredContact: data.preferredContact,
      onsite: data.onsite,
      isConfirmed: false,
    };
    console.log("making req ", apptRequest);

    createMutation.mutate(apptRequest);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-zinc-900 rounded-md p-5"
    >
      {date ? (
        <>
          <FormInputTwoCheckboxGrid label="Type">
            <div className="checkbox-group grid grid-cols-2 gap-4">
              <Controller
                name="serviceRequested"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <FormInputCheckboxGrid
                      label="Consultation"
                      value="consultation"
                      checked={value === true}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange(true);
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />

                    <FormInputCheckboxGrid
                      label="Service"
                      value="service"
                      checked={value === false}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange(false);
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />
                  </>
                )}
              />
            </div>
          </FormInputTwoCheckboxGrid>
          <FormInputTwoCheckboxGrid label="Preferred Contact Method">
            <div className="checkbox-group grid grid-cols-2 gap-4">
              <Controller
                name="preferredContact"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <FormInputCheckboxGrid
                      label="Email"
                      value="email"
                      checked={value === "email"}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange("email");
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />

                    <FormInputCheckboxGrid
                      label="Phone"
                      value="phone"
                      checked={value === "phone"}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange("phone");
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />
                  </>
                )}
              />
            </div>
          </FormInputTwoCheckboxGrid>
          <FormInputTwoCheckboxGrid label="Service Location">
            <div className="checkbox-group grid grid-cols-2 gap-4">
              <Controller
                name="onsite"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <FormInputCheckboxGrid
                      label="Onsite"
                      value="onsite"
                      checked={value === true}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange(true);
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />

                    <FormInputCheckboxGrid
                      label="Remote"
                      value="remote"
                      checked={value === false}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          onChange(false);
                        } else {
                          onChange(undefined);
                        }
                      }}
                    />
                  </>
                )}
              />
            </div>
          </FormInputTwoCheckboxGrid>

          <FormInputGrid
            label="Date"
            field={
              <Controller
                name="localDate"
                control={control}
                disabled={true}
                render={({ field }) => <Input {...field} />}
              />
            }
          />

          <FormInputGrid
            label="Time"
            field={
              <Controller
                name="localTime"
                control={control}
                disabled={true}
                render={({ field }) => <Input {...field} />}
              />
            }
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
        <FormInputGrid
          label="Email"
          field={
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          }
        />
      </div>
      <div className="flex-1 text-center my-5">
        <input
          className="bg-white text-black rounded-sm py-2 px-5 text-xl cursor-pointer active:bg-gray-300"
          type="submit"
        />
      </div>
    </form>
  );
};

export default ScheduleForm;
