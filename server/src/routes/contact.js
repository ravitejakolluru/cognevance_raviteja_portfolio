import { Router } from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (request, response, next) => {
  const { name, email, subject, message } = request.body || {};
  const fields = { name, email, subject, message };

  for (const [field, value] of Object.entries(fields)) {
    if (typeof value !== 'string' || !value.trim()) {
      return response.status(400).json({ message: 'All fields are required.' });
    }
  }

  const normalized = Object.fromEntries(
    Object.entries(fields).map(([field, value]) => [field, value.trim()]),
  );
  if (!emailPattern.test(normalized.email)) {
    return response.status(400).json({ message: 'Please provide a valid email.' });
  }

  const limits = { name: 80, email: 160, subject: 160, message: 3000 };
  const oversizedField = Object.entries(limits).find(([field, limit]) => normalized[field].length > limit);
  if (oversizedField) {
    return response.status(400).json({
      message: `${oversizedField[0][0].toUpperCase()}${oversizedField[0].slice(1)} is too long.`,
    });
  }
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({ message: 'Contact form is temporarily unavailable. Please try again later.' });
  }

  try {
    const saved = await Contact.create(normalized);
    return response.status(201).json({ message: 'Message saved successfully.', id: saved._id });
  } catch (error) {
    return next(error);
  }
});

export default router;
