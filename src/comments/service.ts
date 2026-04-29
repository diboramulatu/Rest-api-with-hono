import { eq } from "drizzle-orm";
import { db } from "../db";
import { commentsTable } from "../schema";

export async function getAllComments() {
  return db.select().from(commentsTable);
}

export async function getCommentById(id: number) {
  const result = await db.select().from(commentsTable).where(eq(commentsTable.id, id));
  return result[0] ?? null;
}

export async function getCommentsByPostId(postId: number) {
  return db.select().from(commentsTable).where(eq(commentsTable.postId, postId));
}

export async function createComment(data: { content: string; postId: number; userId: number }) {
  const result = await db.insert(commentsTable).values(data).returning();
  return result[0];
}