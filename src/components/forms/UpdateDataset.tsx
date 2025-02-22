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
interface UpdateDatasetProps {
  datasetId: number;
  //  onDelete: (id: number) => void;
  data: {
    title: string;
    year: string;
    pi_name: string;
    description: string;
    division: string;
    papers: string | null;
    tags: string | null;
  };
}

const UpdateDataset: React.FC<UpdateDatasetProps> = ({
  datasetId,
  //onDelete,
  data,
}) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: UpdateDatasetProps) => {
    if (!values) return;

    startTransition(() => {
      updateDataset(Number(datasetId), values)
        .then((data) => {
          if (data.success) {
            toast({
              description: "Dataset updated successfully",
              variant: "default",
              className: "bg-emerald-500 text-white font-bold",
            });
            //  router.push(`/datasets/${id}`);
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
  return (
    <div>
      <h1>vepermimp</h1>
      {JSON.stringify(data.title)}
    </div>
  );
};

export default UpdateDataset;
