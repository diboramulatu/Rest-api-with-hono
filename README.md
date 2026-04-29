**Features
 Modular routing (Users, Posts, Comments)
 Relational database with foreign keys
 Service layer for business logic
 SQLite database using Drizzle ORM
 RESTful API endpoints
 Clean and scalable folder structure

**Tech Stack
 Framework: Hono
 ORM: Drizzle ORM
 Database: SQLite
 Runtime: Bun / Node.js
 Validation: Zod (optional)

** Database Design(as it is defined in the assignment requernmet)
Entities:
Users
Posts
Comments
Relationships:
A user can have multiple posts
A post belongs to one user
A post can have multiple comments
A comment belongs to one post and one user

**set up instuction
1. Clone the repository
git clone https://github.com/diboramulatu/Rest-api-with-hono

2. Navigate into the project folder
cd hono-bcpa

3. Install dependencies
npm install
OR (if using Bun)
bun install

4. Create .env file
echo DB_FILE_NAME=local.db > .env

5. Push database schema to SQLite
npx drizzle-kit push --config=drizzle.config.ts

6. Start development server
npm run devdev

open http://localhost:3000
