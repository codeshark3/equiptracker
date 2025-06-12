"use server";
import { db } from "./db";
import * as z from "zod";
import { and, count, eq, sql } from "drizzle-orm";
import { bookingSchema } from "~/schemas/index";
import { booking, user } from "./db/schema";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function insertBooking({
  values,
  bookingId,
}: {
  values: z.infer<typeof bookingSchema>;
  bookingId: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_id = session?.user.id;
  const validatedFields = bookingSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const {
    name,
    title,
    date,
    equipment_name,
    start_time,
    end_time,
    project_name,
    supervisor_name,
  } = validatedFields.data;

  try {
    await db.insert(booking).values({
      id: bookingId,
      name,
      title,
      date: date.toISOString(),
      equipment_name,
      start_time,
      end_time,
      project_name,
      supervisor_name,
    });
    revalidatePath("/");
    return { success: true, message: "Booking added successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
}

export async function updateBookingStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user_role = session?.user.role;
  if (user_role === "admin" || user_role === "staff") {
    const book = await db
      .update(booking)
      .set({ status })
      .where(eq(booking.id, id));
    return { success: "Booking request updated successfully!" };
  } else {
    return {
      error: "You are not authorized to update this booking!",
    };
  }
}

export async function getBookings() {
  const bookings = await db.select().from(booking);
  return bookings;
}

export async function getBookingById(id: string) {
  const book = await db.select().from(booking).where(eq(booking.id, id));
  return book;
}

export async function updateBooking({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof bookingSchema>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_role = session?.user.role;
  if (user_role === "admin" || user_role === "staff") {
    const validatedFields = bookingSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields!" };
    }

    const {
      name,
      title,
      date,
      equipment_name,
      start_time,
      end_time,
      project_name,
      supervisor_name,
    } = validatedFields.data;

    try {
      await db
        .update(booking)
        .set({
          name,
          title,
          date: date.toISOString(),
          equipment_name,
          start_time,
          end_time,
          project_name,
          supervisor_name,
        })
        .where(eq(booking.id, id));
      revalidatePath("/");
      return { success: true, message: "Booking updated successfully!" };
    } catch (error: any) {
      return { error: error?.message };
    }
  } else {
    return {
      error: "You are not authorized to update this booking!",
    };
  }
}
