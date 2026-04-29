import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as userService from "./service.ts";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

const app = new Hono();

app.get("/", async (c) => {
  const users = await userService.getAllUsers();
  return c.json(users);
});

app.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ message: "Invalid user ID" }, 400);

  const user = await userService.getUserById(id);
  if (!user) return c.json({ message: "User not found" }, 404);

  return c.json(user);
});

app.post("/", zValidator("json", userSchema), async (c) => {
  const body = c.req.valid("json");

  const existing = await userService.getUserByEmail(body.email);
  if (existing) {
    return c.json({ message: "User already exists" }, 400);
  }

  const user = await userService.createUser(body);
  return c.json(user, 201);
});

export default app;