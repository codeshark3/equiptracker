import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getBookingById } from "~/server/booking_queries";
import { Building, User, Calendar, Mail } from "lucide-react";
import BookingActions from "~/components/BookingActions";
const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  const booking = await getBookingById(id);

  if (!Array.isArray(booking) || booking.length === 0) {
    return <div>Booking not found or unauthorized</div>;
  }

  const request = booking[0] as NonNullable<(typeof booking)[0]>;
  return (
    <div className="mx-auto w-full px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">{request.name}</h1>
        <div className="mt-4 flex gap-2">
          <Link href="/">
            <Button variant="outline">Back to Requests</Button>
          </Link>
          <BookingActions requestId={request.id} />
        </div>
      </div>

      <div className="rounded-lg border p-6 shadow-sm">
        {/* Metadata Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <span className="text-sm text-primary">{request.date}</span>
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
            <span className="text-sm font-medium text-gray-500">End Time:</span>
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
            <span className="text-sm text-primary">{request.project_name}</span>
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

        {/* Description Section */}

        {/* Metadata Footer */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Created: {request.created_at.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
