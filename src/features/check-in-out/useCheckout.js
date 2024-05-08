import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has Checked-out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Booking  has failed to made the Checked-out");
    },
  });

  return { checkout, isLoading };
}
