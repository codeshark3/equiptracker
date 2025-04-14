"use client";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectItem } from "../ui/select";
import CustomFormField from "~/components/CustomFormField";
import { Form } from "~/components/ui/form";
import { FormFieldType } from "~/components/CustomFormField";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { bookingSchema } from "~/schemas";
import { equipment_names, time } from "~/constants";
import { insertBooking } from "~/server/booking_queries";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const BookingForm = () => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const router = useRouter();

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

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    const bookingId = uuidv4();
    console.log(values);
    startTransition(async () => {
      try {
        const result = await insertBooking({ values, bookingId });
        if (result.success) {
          toast({
            description: "Booking created successfully",
            variant: "default",
            className: "bg-emerald-500 text-white font-bold",
          });
          form.reset();
          setOpen(false);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        toast({
          description: "An error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new booking.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
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

            <div className="flex gap-2">
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
                {equipment_names.map((equipment_name) => (
                  <SelectItem key={equipment_name} value={equipment_name}>
                    {equipment_name}
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <div className="flex gap-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="start_time"
                label="Start Time"
                placeholder="Start Time"
              >
                {time.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="end_time"
                label="End Time"
                placeholder="End Time"
              >
                {time.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <div className="flex gap-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="supervisor_name"
                label="Supervisor Name"
                placeholder="Supervisor Name"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="project_name"
                label="Project Name"
                placeholder="Project Name"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Uploading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
