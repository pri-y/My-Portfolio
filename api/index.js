import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cached MongoDB Connection for Vercel Serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables on Vercel.');
  }

  const db = await mongoose.connect(MONGODB_URI);
  cachedDb = db;
  return db;
}

// Contact Schema & Model (check if existing to prevent overwrite error in hot-reloading/serverless)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Review Schema & Model
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

// Routes
// POST /api/contact - Save contact message to MongoDB
app.post('/api/contact', async (req, res) => {
  try {
    await connectToDatabase();
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: 'Please provide name, email, and message.' });
    }

    const newContact = new Contact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Message saved successfully to MongoDB!',
      data: newContact,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);

    if (error.code === 59 || error.codeName === 'CommandNotFound') {
      return res.status(400).json({
        success: false,
        error: 'Using a read-only endpoint. Please update MONGODB_URI connection string.',
      });
    }

    res.status(500).json({ success: false, error: error.message || 'Failed to save message to MongoDB.' });
  }
});

// GET /api/contact - Retrieve messages from MongoDB
app.get('/api/contact', async (req, res) => {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages.' });
  }
});

// GET /api/reviews - Retrieve reviews from MongoDB
app.get('/api/reviews', async (req, res) => {
  try {
    await connectToDatabase();
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reviews.' });
  }
});

// POST /api/reviews - Save a new review to MongoDB
app.post('/api/reviews', async (req, res) => {
  try {
    await connectToDatabase();
    const { name, rating, comment } = req.body;
    if (!name || !comment) {
      return res.status(400).json({ success: false, error: 'Please provide name and comment.' });
    }

    const newReview = new Review({
      name: name.trim(),
      rating: Number(rating) || 5,
      comment: comment.trim(),
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: 'Review saved successfully to MongoDB!',
      data: newReview,
    });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to save review to MongoDB.' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await connectToDatabase();
    res.json({
      status: 'ok',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default app;
