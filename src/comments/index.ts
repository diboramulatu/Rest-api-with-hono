import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as commentService from "./service.js";
import * as postService from "../posts/service.js";
import * as userService from "../users/service.js";

const commentSchema = z.object({
  content: z.string().min(1),
  postId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
});

const app = new Hono();

app.get("/", async (c) => {
  const comments = await commentService.getAllComments();
  return c.json(comments);
});

app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ message: "Invalid comment ID" }, 400);

  const comment = await commentService.getCommentById(id);
  if (!comment) return c.json({ message: "Comment not found" }, 404);

  return c.json(comment);
});

app.get("/post/:postId", async (c) => {
  const postId = Number(c.req.param("postId"));
  if (isNaN(postId)) return c.json({ message: "Invalid post ID" }, 400);

  const post = await postService.getPostById(postId);
  if (!post) return c.json({ message: "Post not found" }, 404);

  const comments = await commentService.getCommentsByPostId(postId);
  return c.json(comments);
});

app.post("/", zValidator("json", commentSchema), async (c) => {
  const body = c.req.valid("json");

  const user = await userService.getUserById(body.userId);
  if (!user) return c.json({ message: "User not found" }, 404);

  const post = await postService.getPostById(body.postId);
  if (!post) return c.json({ message: "Post not found" }, 404);

  const comment = await commentService.createComment(body);
  return c.json(comment, 201);
});

export default app;