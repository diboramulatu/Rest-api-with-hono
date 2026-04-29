import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as postService from "./service.ts";
import * as userService from "../users/service.ts";

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.coerce.number().int().positive(),
});

const app = new Hono();

app.get("/", async (c) => {
  const posts = await postService.getAllPosts();
  return c.json(posts);
});

app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ message: "Invalid post ID" }, 400);

  const post = await postService.getPostById(id);
  if (!post) return c.json({ message: "Post not found" }, 404);

  return c.json(post);
});

app.get("/user/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));
  if (isNaN(userId)) return c.json({ message: "Invalid user ID" }, 400);

  const user = await userService.getUserById(userId);
  if (!user) return c.json({ message: "User not found" }, 404);

  const posts = await postService.getPostsByUserId(userId);
  return c.json(posts);
});

app.post("/", zValidator("json", postSchema), async (c) => {
  const body = c.req.valid("json");

  const user = await userService.getUserById(body.userId);
  if (!user) return c.json({ message: "User not found" }, 404);

  const post = await postService.createPost(body);
  return c.json(post, 201);
});

export default app;