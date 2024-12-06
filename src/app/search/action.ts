"use server";

import { db } from "~/server/db";
import { user } from "~/server/db/schema";

import { sql, or } from "drizzle-orm";

export async function searchUsers(formData: FormData) {
  const query = formData.get("query")?.toString().trim() || "";

  if (!query) {
    return [];
  }

  // Perform a case-insensitive search for users by name or email
  //const results = await db
  //    .select()
  // .from(user)
  // .where(like(user.name, `%${query}%`) or  like(user.email, `%${query}%`))
  const results = await db
    .select()
    .from(user)
    .where(
      sql`${user.name} like ${"%" + query + "%"} or ${user.email} like ${"%" + query + "%"}`,
    );
  return results;
}
