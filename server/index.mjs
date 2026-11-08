import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DoctorRoutes, AppointmentRouter, ServiceRoutes, SignIn } from './routes/routes.mjs';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/doctor', DoctorRoutes);
app.use('/api/appointment', AppointmentRouter);
app.use('/api/service', ServiceRoutes);
app.use('/SignIn', SignIn);

app.listen(port, () => {
  console.log(`Clinic Server running on http://localhost:${port}`);
});

const clusterConnectionString = process.env.MongoConnectionString;

if (clusterConnectionString) {
  mongoose
    .connect(clusterConnectionString)
    .then(() => {
      console.log('MongoDB successfully connected');
    })
    .catch((err) => {
      console.warn('MongoDB connection failed. Continuing in local fallback mode:', err.message);
    });
} else {
  console.warn('MongoConnectionString not set in server/.env. Backend running with fallback handlers.');
}
