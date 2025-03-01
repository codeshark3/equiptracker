"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "~/components/CustomFormField";
import { FormFieldType } from "~/components/CustomFormField";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { useTransition } from "react";
import { insertAccessRequest } from "~/server/access_request_queries";
import { toast } from "~/hooks/use-toast";
import { Form } from "~/components/ui/form";
import { accessRequestSchema } from "~/schemas";
interface RequestAccessModalProps {
    datasetId: number;
    datasetTitle: string;
}

const RequestAccessModal = ({ datasetId, datasetTitle }: RequestAccessModalProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof accessRequestSchema>>({
        resolver: zodResolver(accessRequestSchema),
        defaultValues: {
            reason: "",

        },
    });

    async function onSubmit(values: z.infer<typeof accessRequestSchema>) {
        startTransition(() => {

            insertAccessRequest({ values, datasetId })
                .then((data) => {
                    if (data.success) {
                        toast({
                            description: "Access request submitted successfully",
                            variant: "default",
                            className: "bg-emerald-500 text-white font-bold",
                        });
                        form.reset();
                    } else {
                        toast({
                            description: "Failed to submit request",
                            variant: "destructive",
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Request Access</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Access to Dataset</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for requesting access to &quot;{datasetTitle}&quot;
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <CustomFormField
                                control={form.control}
                                fieldType={FormFieldType.INPUT}
                                name="reason"
                                label="Reason"
                                placeholder="Enter your reason for requesting access..."
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                            />

                            <Button type="submit" className="w-full bg-primary" disabled={isPending}>
                                {isPending ? "Submitting..." : "Submit Request"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RequestAccessModal; 