# Quizly — Quiz Management & Online Assessment Platform

A full-stack starter implementation of the supplied specification. It includes student/admin authentication, role-protected dashboards, quiz/category/question management, timed attempts, backend scoring, answer review, history, leaderboard, and student administration.

## Stack
- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios, Recharts
- Backend: Node.js, Express, JWT, bcrypt, PostgreSQL (`pg`)
- Database: PostgreSQL

## Requirements
- Node.js 18+
- PostgreSQL 14+

## 1. Configure PostgreSQL
Create a database:

```sql
CREATE DATABASE quiz_platform;
```

## 2. Start the backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and set `DATABASE_URL` and a long random `JWT_SECRET`. Then:

```bash
npm install
npm run db:init
npm run seed
npm run dev
```

API runs at `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

Seeded admin credentials (change these before use):
- Email: `admin@example.com`
- Password: `ChangeMe123!`

The seed script also creates starter categories and a published JavaScript Fundamentals quiz with sample questions.

## 3. Start the frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Main workflows

### Admin
1. Sign in with the seeded admin credentials.
2. Open **Quizzes** and create a quiz.
3. Open **Questions** on that quiz and add multiple-choice questions. Exactly one option must be correct.
4. Publish the quiz. A quiz cannot be published without at least one question.
5. Manage categories and activate/deactivate student accounts.

### Student
1. Register a student account.
2. Explore published quizzes.
3. Start an assessment, answer questions, navigate using the question grid, and submit.
4. View the score, explanations, attempt history and leaderboard.

## API overview

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` |
| Categories | `GET/POST /api/categories`, `PUT/DELETE /api/categories/:id` |
| Quizzes | `GET /api/quizzes`, `GET /api/quizzes/:id`, `POST/PUT/DELETE /api/quizzes/:id`, `PATCH /api/quizzes/:id/publish` |
| Questions | `GET/POST /api/quizzes/:quizId/questions`, `PUT/DELETE /api/questions/:id` |
| Attempts | `POST /api/quizzes/:quizId/start`, `POST /api/quizzes/:quizId/submit`, `GET /api/attempts`, `GET /api/attempts/:id` |
| Dashboards | `GET /api/dashboard/student`, `GET /api/admin/analytics` |
| Admin users | `GET /api/users`, `PATCH /api/users/:id/status`, `DELETE /api/users/:id` |
| Leaderboard | `GET /api/leaderboard` |

## Important implementation notes
- Correct options are not sent to students when an attempt starts.
- The server computes the score from database-stored correct options; client-submitted scores are ignored.
- Attempt expiry is stored server-side and checked during submission. The browser countdown is only a display aid.
- Student routes require a valid JWT; admin endpoints additionally require the `ADMIN` role.
- Passwords are hashed using bcrypt. API responses do not include password hashes.
- `max_attempts = 0` means unlimited attempts.

## Before production
This is a functional core implementation, not a security-audited production deployment. Add automated tests, email-based password reset, refresh-token rotation/revocation, CSRF protection if using cookies, stricter schema validation, audit logs, pagination, monitoring, backups, HTTPS, and deployment-specific CORS/DB SSL settings. Consider preventing duplicate submissions with idempotency keys and implementing server-side autosave for in-progress answers. The current version saves answers at final submission.
