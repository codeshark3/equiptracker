// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { time } from "console";
import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import {
  index,
  text,
  boolean,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `equiptracker_${name}`);

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: varchar("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("banReason"),
  banExpires: integer("banExpires"),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token"),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  impersonatedBy: text("impersonatedBy"),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  password: text("password"),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const booking = createTable("booking", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  equipment_name: text("equipment_name").notNull(),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  project_name: text("project_name").notNull(),
  supervisor_name: text("supervisor_name").notNull(),
  approved_by: text("approved_by"),
  status: text("status").default("pending").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
