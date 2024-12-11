import { differenceInHours, getDate, sub } from "date-fns";
import scheduleData from "./schedule.config.json";
import { Appointment } from "../../types";

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

const hasAdjacentAppointments = (time: Date, appointments: Appointment[]) => {
  const nearbyAppointments = appointments.filter((appt) => {
    console.log("time", Math.abs(differenceInHours(new Date(appt.date), time)));

    return Math.abs(differenceInHours(new Date(appt.date), time)) < 1;
  });
  return nearbyAppointments.length > 0;
};

export const filterTimes = (time?: Date, appointments?: Appointment[]) => {
  if (!time) {
    return false;
  }
  const day = getDate(time);

  const dayAppointments =
    appointments?.filter((appt) => new Date(appt.date).getDate() === day) || [];

  if (filterPassedTime(time)) {
    if (filterSchedule(time)) {
      if (dayAppointments.length > 0) {
        if (!hasAdjacentAppointments(time, dayAppointments)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
  return false;
};

const filterScheduleDays = (time: Date) => {
  const day = time.getDay();
  const scheduleDay = scheduleData.days[day];
  return Boolean(scheduleDay) || false;
};

export const filterDaysWithTime = (
  time?: Date,
  appointments?: Appointment[]
) => {
  if (!time) {
    return false;
  }
  if (filterPassedDate(time)) {
    if (filterScheduleDays(time)) {
      if (scheduleData.maxAppointmentsPerDay) {
        const day = getDate(time);
        const dayAppointments =
          appointments?.filter(
            (appt) => new Date(appt.date).getDate() === day
          ) || [];
        if (dayAppointments.length < scheduleData.maxAppointmentsPerDay) {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  return false;
};

export const filterDays = (time?: Date) => {
  if (!time) {
    return false;
  }
  if (filterPassedDate(time)) {
    if (filterScheduleDays(time)) {
      return true;
    }
  }
  return false;
};

export const filterDaysWithAppointments = (
  time?: Date,
  appointments?: Appointment[]
) => {
  if (!time) {
    return false;
  }
  console.log("time", time);
  if (filterDays(time)) {
    const day = getDate(time);
    console.log("appointments", appointments);
    const dayAppointments =
      appointments?.filter((appt) => new Date(appt.date).getDate() === day) ||
      [];
    console.log("dayAppointments", dayAppointments);
    if (dayAppointments.length > 0) {
      return true;
    }
  }
  return false;
};
