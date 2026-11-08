# AY-Clinic Appointment System

A modern full-stack clinic and doctor appointment management platform built with Next.js 15, React 19, Redux Toolkit, Tailwind CSS, Express, and MongoDB.

## Features
- **Patient Appointment Booking**: Intuitive multi-step appointment scheduler with service & specialist selection.
- **Doctor Directory**: Detailed doctor profiles with specialties, ratings, experience, and direct booking.
- **Service Catalog**: Interactive medical service browser with real-time detail preview.
- **Doctor Portal (`/Doctor`)**: Doctor login and dashboard to manage schedules, patients, and appointment statuses.
- **Flexible Backend**: Ready-to-use Next.js built-in API routes with mock data fallback, plus standalone Express/MongoDB server support.

## Getting Started

### 1. Run Next.js Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. (Optional) Run Express Server
```bash
cd server
npm install
npm run serve
```
Configure `.env` in the `server` directory with `PORT=5000` and `MongoConnectionString=your_mongodb_uri`.

