import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export const postsTable = sqliteTable("posts_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});

export const commentsTable = sqliteTable("comments_table", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  postId: int("post_id").notNull().references(() => postsTable.id, { onDelete: "cascade" }),
  userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  comments: many(commentsTable),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  user: one(usersTable, { fields: [postsTable.userId], references: [usersTable.id] }),
  comments: many(commentsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  post: one(postsTable, { fields: [commentsTable.postId], references: [postsTable.id] }),
  user: one(usersTable, { fields: [commentsTable.userId], references: [usersTable.id] }),
}));
