"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "~/hooks/use-toast";
import { datasetSchema } from "~/schemas/index";
import { updateDataset, getDatasetById } from "~/server/dataset_queries";
import { Form } from "~/components/ui/form";
import { FormFieldType } from "~/components/CustomFormField";
import CustomFormField from "~/components/CustomFormField";
import { Button } from "~/components/ui/button";
import * as z from "zod";
import { SelectItem } from "~/components/ui/select";
import { years, divisions } from "~/constants";
import { Input } from "~/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";

interface UpdateDatasetFormProps {
  title: string;
  year: string;
  pi_name: string;
  description: string;
  division: string;
  papers: string;
  tags: string;
}
const UpdateDatasetForm = () => {
  const { id } = useParams() as { id: string };
  const [dataset, setDataset] = useState<z.infer<typeof datasetSchema> | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //  Initialize form with empty default values
  const form = useForm<z.infer<typeof datasetSchema>>({
    resolver: zodResolver(datasetSchema),
    defaultValues: async () => {
      const { data } = await getDatasetById(Number(id));
      return data;
    },
  });

  // useEffect(() => {
  //   async function fetchDataset() {
  //     try {
  //       const data = await getDatasetById(Number(id));
  //       setDataset(data);

  //       form.reset(data);
  //     } catch (error) {
  //       console.error("Error fetching dataset:", error);
  //     }
  //   }
  //   fetchDataset();
  // }, [id, form]);

  const onSubmit = (values: z.infer<typeof datasetSchema>) => {
    if (!dataset) return;
    console.log("sub", values);
    startTransition(() => {
      updateDataset(Number(id), values)
        .then((data) => {
          if (data.success) {
            toast({
              description: "Dataset updated successfully",
              variant: "default",
              className: "bg-emerald-500 text-white font-bold",
            });
            router.push(`/datasets/${id}`);
          } else {
            toast({
              description: "An error occurred while updating the dataset",
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        });
    });
  };

  // ✅ Show loading until dataset is fetched
  if (!dataset) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Title"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="year"
          label="Year"
          placeholder="Year"
        >
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
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
          placeholder="Dataset Description"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="papers"
          label="Papers"
          placeholder="Related Papers"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="tags"
          label="Tags"
          placeholder="Dataset Tags"
        />
        <Button
          type="submit"
          className="w-full bg-primary"
          disabled={isPending}
        >
          Update Dataset
        </Button>
      </form>
    </Form>
  );
};

export default UpdateDatasetForm;
