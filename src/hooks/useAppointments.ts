import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  Appointment,
} from "../services/appointmentService";

// Hook to get all appointments
export const useAppointments = () => {
  return useQuery<Appointment[], Error>("appointments", fetchAppointments);
};

// Hook to create an appointment
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(createAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries("appointments"); // Refetch appointments
    },
  });
};

// Hook to update an appointment
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries("appointments"); // Refetch appointments
    },
  });
};

// Hook to delete an appointment
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries("appointments"); // Refetch appointments
    },
  });
};
