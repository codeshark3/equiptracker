"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookingSchema } from "~/schemas";
import { getBookingById, updateBooking } from "~/server/booking_queries";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import CustomFormField, { FormFieldType } from "~/components/CustomFormField";

interface UpdateBookingFormProps {
  bookingId: string;
}

const UpdateBookingForm: React.FC<UpdateBookingFormProps> = ({ bookingId }) => {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: "",
      name: "",
      date: new Date(),
      equipment_name: "",
      start_time: "",
      end_time: "",
      project_name: "",
      supervisor_name: "",
    },
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const booking = await getBookingById(bookingId);
        if (booking && booking.length > 0) {
          form.reset({
            ...booking[0],
            date: new Date(booking[0].date),
          });
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    fetchBooking();
  }, [bookingId, form]);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    try {
      const result = await updateBooking({ id: bookingId, values });
      if (result.success) {
        toast({
          description: "Booking updated successfully",
          variant: "default",
          className: "bg-emerald-500 text-white font-bold",
        });
      } else {
        toast({
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="title"
        label="Title"
        placeholder="Title"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Name"
        placeholder="Name"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.DATE_PICKER}
        name="date"
        label="Date"
        placeholder="Date"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.SELECT}
        name="equipment_name"
        label="Equipment Name"
        placeholder="Equipment Name"
      >
        {/* Add equipment options here */}
      </CustomFormField>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="start_time"
        label="Start Time"
        placeholder="Start Time"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="end_time"
        label="End Time"
        placeholder="End Time"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="project_name"
        label="Project Name"
        placeholder="Project Name"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="supervisor_name"
        label="Supervisor Name"
        placeholder="Supervisor Name"
      />
      <Button type="submit">Update Booking</Button>
    </form>
  );
};

export default UpdateBookingForm;
