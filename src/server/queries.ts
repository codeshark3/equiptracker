// import "server-only";
"use server";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { user } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { SignInSchema } from "~/schemas/index";
import type * as z from "zod";
// import { validateRequest } from "~/auth";

export async function getUsersByName(keyword: string) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const project = await db.query.user.findFirst({
    where: (model, { eq }) => eq(model.name, keyword),
  });
  if (!project) throw new Error("Image not found");

  // if (project.userId !== user.userId) throw new Error("Unauthorized");

  return project;
}

export async function getUsers() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const projects = await db.query.projects.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return projects;
}
