import { add, differenceInHours, getDate, max, sub } from "date-fns";
import scheduleData from "./schedule.config.json";

const filterPassedDate = (time: Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return sub(currentDate, { hours: 24 }).getTime() < selectedDate.getTime();
};

const filterPassedTime = (time: Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

const filterSchedule = (time: Date) => {
  const day = time.getDay();
  const hour = time.getHours();
  const scheduleDay = scheduleData.days[day];

  if (typeof scheduleDay == "boolean") {
    return scheduleDay;
  } else {
    if (scheduleDay.start) {
      if (scheduleDay.end) {
        return hour >= scheduleDay.start && hour < scheduleDay.end;
      } else {
        return hour >= scheduleDay.start;
      }
    } else if (scheduleDay.end) {
      return hour < scheduleDay.end;
    }
  }
  return false;
};

const hasAdjacentAppointments = (time: Date, appointments: any) => {
  const nearbyAppointments = appointments.filter((appt: any) => {
    console.log("time", Math.abs(differenceInHours(new Date(appt.date), time)));

    return Math.abs(differenceInHours(new Date(appt.date), time)) < 1;
  });
  return nearbyAppointments.length > 0;
};

export const filterTimes = (time: Date, appointments: any) => {
  const day = getDate(time);

  const dayAppointments = appointments.filter(
    (appt: any) => new Date(appt.date).getDate() === day
  );

  if (filterPassedTime(time)) {
    if (filterSchedule(time)) {
      if (dayAppointments.length > 0) {
        if (!hasAdjacentAppointments(time, dayAppointments)) {
          return true;
        }
      } else {
        return true;
      }
    }

    return false;
  }
};

const filterScheduleDays = (time: Date) => {
  const day = time.getDay();
  const scheduleDay = scheduleData.days[day];
  return Boolean(scheduleDay) || false;
};

export const filterDays = (time: Date, appointments: any) => {
  if (filterPassedDate(time)) {
    if (filterScheduleDays(time)) {
      if (scheduleData.maxAppointmentsPerDay) {
        const day = getDate(time);
        const dayAppointments = appointments.filter(
          (appt: any) => new Date(appt.date).getDate() === day
        );
        if (dayAppointments.length < scheduleData.maxAppointmentsPerDay) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }
};
