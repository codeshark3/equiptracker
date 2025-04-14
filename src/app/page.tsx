import { headers } from "next/headers";

import TableComponent from "~/components/main_table/TableComponent";

import { getBookings } from "~/server/booking_queries";
import Image from "next/image";
import Header from "~/components/Header";
export default async function HomePage() {
  const bookings = await getBookings();
  const formattedBookings = bookings.map((booking) => ({
    ...booking,
    created_at: booking.created_at?.toString() || "",
  }));
  return (
    <div className="px-4">
      <Header />
      {/* <div className="flex items-center justify-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={150}
          height={150}
        />{" "}

      
      </div> */}
      <TableComponent
        initialData={formattedBookings.map((booking) => ({
          ...booking,
          created_at: new Date(booking.created_at),
          updated_at: new Date(booking.updated_at),
        }))}
      />
    </div>
  );
}
