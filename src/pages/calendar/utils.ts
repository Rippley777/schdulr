import { sub } from "date-fns";
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

export const filterTimes = (time: Date) => {
  if (filterPassedTime(time)) {
    return filterSchedule(time);
  } else {
    return false;
  }
};

const filterScheduleDays = (time: Date) => {
  const day = time.getDay();
  const scheduleDay = scheduleData.days[day];
  return Boolean(scheduleDay) || false;
};

export const filterDays = (time: Date) => {
  if (filterPassedDate(time)) {
    return filterScheduleDays(time);
  }
  return false;
};
