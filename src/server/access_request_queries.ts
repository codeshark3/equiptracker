"use server";
import { db } from "./db";
import * as z from "zod";
import { and, eq } from "drizzle-orm";
import { accessRequestSchema, datasetInsertSchema, datasetSchema } from "~/schemas/index";
import { dataset, tags, datasetTags, access_request } from "./db/schema";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { title } from "process";
import { revalidatePath } from "next/cache";



export async function insertAccessRequest({ values, datasetId }: { values: z.infer<typeof accessRequestSchema>, datasetId: number }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    console.log(values);
    const user_id = session?.user.id;
    const validatedFields = accessRequestSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid Fields!",
        };
    }

    const { reason } = validatedFields.data;
    try {
        await db.insert(access_request).values({
            reason: reason ?? '',
            userId: user_id ?? '',
            datasetId: datasetId ?? 0,
            status: "pending",
        });

        revalidatePath(`/datasets/${datasetId}`);
        return {
            success: "Access request submitted successfully!",
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to submit access request!",
        };
    }
}


