"use client";
import React from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { updateBookingStatus } from "~/server/booking_queries";
import { toast } from "~/hooks/use-toast";
import { useSessionStore } from "~/store/sessionStore";

interface BookingActionsProps {
  requestId: string;
}

const BookingActions: React.FC<BookingActionsProps> = ({ requestId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useSessionStore((state) => state.user);

  const handleStatusUpdate = (status: string) => {
    startTransition(() => {
      updateBookingStatus({ id: requestId, status })
        .then((data) => {
          if (data.success) {
            toast({
              description: `Request ${status} successfully`,
              variant: "default",
              className: "bg-emerald-500 text-white font-bold",
            });
            router.refresh();
          } else {
            toast({
              description: data.error,
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            description: "Failed to update request status",
            variant: "destructive",
          });
        });
    });
  };

  return user?.role === "admin" ? (
    <div className="flex space-x-2">
      <div className="flex flex-col">
        <h2 className="mb-2 text-lg font-semibold">Approvals</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleStatusUpdate("approved")}
            disabled={isPending}
            className="bg-emerald-500 font-bold text-white"
          >
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStatusUpdate("rejected")}
            disabled={isPending}
            className="bg-red-500 font-bold text-white"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookingActions;
