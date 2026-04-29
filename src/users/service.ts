import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../schema";

export async function getAllUsers() {
  return db.select().from(usersTable);
}

export async function getUserById(id: number) {
  const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return result[0] ?? null;
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return result[0] ?? null;
}

export async function createUser(data: { name: string; email: string; password: string }) {
  const result = await db.insert(usersTable).values(data).returning();
  return result[0];
}