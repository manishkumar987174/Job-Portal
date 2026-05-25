# Job Portal

A concise setup guide for the Job Portal (Node/Express backend + React/Vite frontend).

Prerequisites: Node.js, npm, MongoDB (local or Atlas). 

Backend .env (create `backend/.env`):
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=change_this_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your email
SMTP_PASS=password

Frontend .env (optional, create `frontend/.env`):
VITE_API_BASE_URL=http://localhost:5000/api

Install & run:

1. Backend: `cd backend && npm install && npm run dev`
2. Frontend: `cd frontend && npm install && npm run dev`

Main dependencies:

- Backend: express, mongoose, jsonwebtoken, bcryptjs, multer, cloudinary, cors, dotenv
- Frontend: react, react-dom, react-router-dom, @reduxjs/toolkit, react-redux, axios, vite, tailwindcss

Quick structure:

- `backend/`: `index.js`, `routes/`, `controllers/`, `models/`, `middlewares/`, `utils/`
- `frontend/`: `src/` (components, hooks, redux slices)


1. Start backend:



cd backend
npm install
npm run dev

1. Start frontend:



cd frontend
npm install
npm run dev

Test accounts (create via Signup):





-> JobPortal lets two roles register: student and recruiter.

-> Recruiters create companies and post jobs with details (location, salary, openings).

-> Students create a profile and upload their CV (PDF) from Profile → Edit.

-> Students browse jobs and apply with one click; an Application record is created.

-> Recruiters open a job’s Applicants list, click a candidate to view profile and resume (signed Cloudinary link).

-> Recruiters can Accept/Reject applications; students can edit profile and re-upload CV anytime.

-> Typical flow: Signup → student uploads CV → browse jobs → apply → recruiter reviews resume → accept/reject.
