"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectItem } from "../ui/select";
import CustomFormField from "~/components/CustomFormField";

import { FormFieldType } from "~/components/CustomFormField";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { DatasetInput } from "~/schemas";
import { datasetSchema } from "~/schemas";
import { years, divisions } from "~/constants";
import { authClient } from "~/lib/auth-client";
import { insertDataset } from "~/server/dataset_queries";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const CreateDatasetForm = () => {
  //const { data: session } = authClient.useSession();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof datasetSchema>>({
    resolver: zodResolver(datasetSchema),
    defaultValues: {
      title: "",
      year: "",
      pi_name: "",
      description: "",
      division: "", // Default to some valid division ID

      papers: "",
      tags: "",
    },
  });

  const onSubmit = (values: z.infer<typeof datasetSchema>) => {
    //   const user_id = session?.user.id;
    // console.warn(values, user_id);

    startTransition(() => {
      insertDataset(values)
        .then((data) => {
          if (data.success) {
            if (data.success) {
              toast({
                // title: { success },
                description: "Samples uploaded successfully",
                variant: "default",
                className: "bg-emerald-500 text-white font-bold ",
              });
              form.reset();
            } else {
              toast({
                // title: { error },
                description: "An error occurred while uploading the samples",
                variant: "destructive",
              });
            }
          }
        })
        .catch((err?: any) => {
          console.error(err);
          //   setError("An error occurred during login.");
        });
    });
  };

  return (
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
          fieldType={FormFieldType.SELECT}
          name="year"
          label="Year"
          placeholder="Year"
        >
          {years.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="pi_name"
          label="Principal Investigator"
          placeholder="Name of Principal Investigator"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="division"
          label="Division"
          placeholder="Select Division"
        >
          {divisions.map((division) => (
            <SelectItem key={division} value={division}>
              {division}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          label="Description"
          placeholder="Description"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="papers"
          label="Papers"
          placeholder="Papers"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="tags"
          label="Tags"
          placeholder="Tags"
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-red-500"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateDatasetForm;
