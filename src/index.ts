import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import usersRoutes from './users';
import postsRoutes from './posts';
import commentsRoutes from './comments';

const app = new Hono();

app.use(logger());
app.use(cors());

app.route('/users', usersRoutes);
app.route('/posts', postsRoutes);
app.route('/comments', commentsRoutes);

app.get('/', (c) => {
  return c.json({
    message: 'Hono BCPA API',
    endpoints: {
      users: '/users',
      posts: '/posts',
      comments: '/comments',
    }
  });
});

export default app;
