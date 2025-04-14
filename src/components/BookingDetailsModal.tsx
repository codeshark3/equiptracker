"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Building, User, Calendar, Mail } from "lucide-react";
import BookingActions from "~/components/BookingActions";
import { Booking } from "./main_table/columns";
import { getBookingById } from "~/server/booking_queries";
import { useSessionStore } from "~/store/sessionStore";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function BookingDetailsModal({
  isOpen,
  onClose,
  id,
}: BookingDetailsModalProps) {
  const [booking, setBooking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && isOpen) {
      const fetchBooking = async () => {
        try {
          const result = await getBookingById(id);
          setBooking(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    }
  }, [id, isOpen]);

  if (loading || booking.length === 0) return null;

  const request = booking[0] as NonNullable<(typeof booking)[0]>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {request.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Requested By:
              </span>
              <span className="text-sm text-primary">{request.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Date:</span>
              <span className="text-sm text-primary">
                {new Date(request.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Start Time:
              </span>
              <span className="text-sm text-primary">{request.start_time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                End Time:
              </span>
              <span className="text-sm text-primary">{request.end_time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <span
                className={`rounded-md px-2 py-1 text-sm ${
                  request.status === "approved"
                    ? "bg-emerald-500 text-white"
                    : request.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-gray-500 text-white"
                }`}
              >
                {request.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Principal Investigator:
              </span>
              <span className="text-sm text-primary">
                {request.supervisor_name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Project Name:
              </span>
              <span className="text-sm text-primary">
                {request.project_name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Equipment:
              </span>
              <span className="text-sm text-primary">
                {request.equipment_name}
              </span>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Created: {request.created_at.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <BookingActions requestId={request.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
