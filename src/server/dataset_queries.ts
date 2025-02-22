// import "server-only";
"use server";
import { db } from "./db";
import * as z from "zod";
import { and, eq } from "drizzle-orm";
import { datasetInsertSchema, datasetSchema } from "~/schemas/index";
import { dataset, tags, datasetTags } from "./db/schema";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { title } from "process";
import { revalidatePath } from "next/cache";
export async function insertDataset(values: z.infer<typeof datasetSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_id = session?.user.id;
  const validatedFields = datasetSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  const { title, year, pi_name, description, division, papers, tags } =
    validatedFields.data;

  try {
    await db.insert(dataset).values({
      title,
      year,
      pi_name,
      description,
      division,
      papers,
      tags,
      user_id: user_id,
    });
    revalidatePath("/datasets");
    return { success: true, message: "Dataset added successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
}

export async function getDatasets() {
  // const datasets = await db.query.datasets.findMany({
  //   orderBy: (model, { desc }) => desc(model.id),
  // });
  // return datasets;

  const datasets = await db.select().from(dataset);
  return datasets;
}

export async function getDatasetById(id: number) {
  const returnedDataset = await db
    .select()
    .from(dataset)
    .where(eq(dataset.id, id));
  return returnedDataset;
}

export async function deleteDataset(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user_id = session.user.id;

  try {
    await db.delete(dataset).where(eq(dataset.id, id));
    revalidatePath("/datasets");
    return { success: true, message: "Dataset deleted successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
}
export async function updateDataset(
  id: number,
  data: z.infer<typeof datasetSchema>,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user_id = session.user.id;
  try {
    await db.update(dataset).set(data).where(eq(dataset.id, id));
    revalidatePath("/datasets");
    return { success: true, message: "Dataset updated successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
}

export async function insertDatasetWithTags(
  data: z.infer<typeof datasetInsertSchema>,
) {
  try {
    //  ✅ Convert FormData to JSON
    const rawData = data;
    // ✅ Validate and parse input using Zod
    const parsedData = datasetInsertSchema.parse({
      title: rawData.title,
      year: rawData.year,
      pi_name: rawData.pi_name,
      description: rawData.description ?? "", // Ensure it's an empty string instead of undefined
      division: rawData.division,
      //  userId: rawData.userId,
      //papers: rawData.papers ?? "", // Ensure it's an empty string instead of undefined
      //tags: rawData.tags, // ? JSON.parse(rawData.tags as string) : [], // Ensure it's an array, never undefined
    });
    //  If validation fails, an error will be thrown, preventing DB insertion
    // const datasetId = crypto.randomUUID();
    // await db.insert(dataset).values({
    //   id: datasetId,
    //   title: parsedData.title,
    //   year: parsedData.year,
    //   pi_name: parsedData.pi_name,
    //   division: parsedData.division,
    //   description: parsedData.description, // Always a string
    //   userId: parsedData.userId,
    //   papers: parsedData.papers, // Always a string
    //   tags: parsedData.tags, // Always an array
    // });
    //  Handle Tags
    // for (let i = 0; i < (parsedData.tags ?? []).length; i++) {
    //   const tagId = parsedData.tags[i];
    //   const tagName = parsedData.tags?.[i] || `Tag ${tagId}`; // Use provided name or default
    //   let existingTag = await db
    //     .select()
    //     .from(tags)
    //     .where(eq(tags.id, tagId))
    //     .limit(1);
    //   if (existingTag.length === 0) {
    //     // If tag does not exist, insert it dynamically with its name
    //     await db.insert(tags).values({
    //       id: tagId, // Ensure this is a valid UUID
    //       name: tagName, // Dynamically set the tag name
    //     });
    //     // Re-fetch the inserted tag to confirm
    //     existingTag = await db
    //       .select()
    //       .from(tags)
    //       .where(eq(tags.id, tagId))
    //       .limit(1);
    //   }
    //   // Insert into dataset_tags (many-to-many relationship)
    //   await db.insert(datasetTags).values({
    //     datasetId: datasetId,
    //     tagId: tagId,
    //   });
    //}
    return { success: true, message: "Dataset added successfully!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
}
