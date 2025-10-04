# M.Dev Portfolio Backend

## Live Deployment Link
[Backend API](https://portfolio-backend-zeta-six.vercel.app)


## Project Overview & Features
This is the backend repository for the portfolio project, providing a robust API to support a frontend application. It handles blog and project management with secure authentication, powering a responsive portfolio dashboard.

### Key Features:
- **Blog Management**: Full CRUD (Create, Read, Update, Delete) operations for blog posts.
- **Project Management**: Full CRUD operations for managing project details.
- **Secure Authentication**: JWT-based authentication for secure user access and protected routes.
- **Database Integration**: Efficient data management with Prisma and PostgreSQL.
- **Type-Safe Code**: Written in TypeScript for enhanced reliability and maintainability.

## Technology Stack
- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Language**: TypeScript
- **Runtime**: Node.js

## Setup Instructions
Follow these steps to set up and run the backend locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohibbullah272/backend-repo.git
   cd your-backend-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL**:
   - Ensure PostgreSQL is installed and running.
   - Create a database for the project:
     ```sql
     CREATE DATABASE portfolioDb;
     ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db?schema=public
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```
   Replace `username`, `password`, and `your-jwt-secret` with your PostgreSQL credentials and a secure random string.

5. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

7. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Other Relevant Notes
- Ensure Node.js (v16 or higher) and PostgreSQL are installed.
- Prisma is used as the ORM for type-safe database interactions; run `npx prisma studio` to explore the database visually.
- The backend uses Express.js for routing and middleware management.
- Secure your JWT_SECRET and avoid exposing it in version control.
- For deployment, consider platforms like Render, Heroku, or AWS with a PostgreSQL database.
- Regularly update dependencies to maintain security and performance.
- Test API endpoints using tools like Postman or cURL to ensure proper functionality.
