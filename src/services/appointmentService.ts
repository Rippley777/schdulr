import axios from "axios";
import { API_URL } from "./api";

const APPOINTMENTS_API_URL = `${API_URL}/api/appointments`;

// Appointment type
export interface Appointment {
  _id: string;
  title: string;
  description?: string;
  date: string;
  isConfirmed: boolean;
}

// Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await axios.get<Appointment[]>(APPOINTMENTS_API_URL);
  return response.data;
};

// Create a new appointment
export const createAppointment = async (
  appointmentData: Omit<Appointment, "_id" | "isConfirmed">
): Promise<Appointment> => {
  const response = await axios.post<Appointment>(
    APPOINTMENTS_API_URL,
    appointmentData
  );
  return response.data;
};

// Update an appointment
export const updateAppointment = async ({
  id,
  appointmentData,
}: {
  id: string;
  appointmentData: Partial<Appointment>;
}): Promise<Appointment> => {
  const response = await axios.put<Appointment>(
    `${APPOINTMENTS_API_URL}/${id}`,
    appointmentData
  );
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (
  id: string
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(
    `${APPOINTMENTS_API_URL}/${id}`
  );
  return response.data;
};
