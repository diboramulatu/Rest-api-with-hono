import { eq } from "drizzle-orm";
import { db } from "../db";
import { postsTable } from "../schema";

export async function getAllPosts() {
  return db.select().from(postsTable);
}

export async function getPostById(id: number) {
  const result = await db.select().from(postsTable).where(eq(postsTable.id, id));
  return result[0] ?? null;
}

export async function getPostsByUserId(userId: number) {
  return db.select().from(postsTable).where(eq(postsTable.userId, userId));
}

export async function createPost(data: { title: string; content: string; userId: number }) {
  const result = await db.insert(postsTable).values(data).returning();
  return result[0];
}