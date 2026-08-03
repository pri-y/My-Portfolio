import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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

  const db = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
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

// Resume Download Schema & Model
const resumeDownloadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  userAgent: { type: String },
  referrer: { type: String },
  screenResolution: { type: String },
  ip: { type: String },
  location: { type: String },
  networkProvider: { type: String },
  downloadedAt: { type: Date, default: Date.now },
});

const ResumeDownload = mongoose.models.ResumeDownload || mongoose.model('ResumeDownload', resumeDownloadSchema);

// Routes
// POST /api/contact - Save contact message to MongoDB
app.post(['/api/contact', '/contact'], async (req, res) => {
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
app.get(['/api/contact', '/contact'], async (req, res) => {
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
app.get(['/api/reviews', '/reviews'], async (req, res) => {
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
app.post(['/api/reviews', '/reviews'], async (req, res) => {
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

// POST /api/notify-resume-download - Track download and trigger notification
app.post(['/api/notify-resume-download', '/notify-resume-download'], async (req, res) => {
  try {
    await connectToDatabase();
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    const { name, email, userAgent, referrer, screenResolution, userIp, location, networkProvider } = req.body || {};
    const ip = userIp || rawIp;

    const downloadLog = new ResumeDownload({
      name: name || 'Anonymous',
      email: email || 'N/A',
      ip,
      location: location || 'Unknown Location',
      networkProvider: networkProvider || 'Unknown Network',
      userAgent: userAgent || req.headers['user-agent'],
      referrer: referrer || req.headers['referer'],
      screenResolution,
      downloadedAt: new Date(),
    });

    await downloadLog.save();

    // Send Email Notification if SMTP / Nodemailer configured
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'priyankaguptajpk@gmail.com';

    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Alerts" <${EMAIL_USER}>`,
          to: NOTIFY_EMAIL,
          subject: `🚨 Resume Downloaded by ${name || 'Visitor'} in ${location || 'Unknown Location'}!`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #0284c7;">🎉 Resume Download Notification!</h2>
              <p>Someone just submitted their details and downloaded your resume from your portfolio website.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 140px;">Visitor Name:</td><td style="padding: 8px; border: 1px solid #ddd; color: #0284c7; font-weight: bold;">${name || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Visitor Email:</td><td style="padding: 8px; border: 1px solid #ddd; color: #0284c7; font-weight: bold;">${email || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Time:</td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location:</td><td style="padding: 8px; border: 1px solid #ddd;">${location || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Network / ISP:</td><td style="padding: 8px; border: 1px solid #ddd;">${networkProvider || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">IP Address:</td><td style="padding: 8px; border: 1px solid #ddd;">${ip}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Device / Browser:</td><td style="padding: 8px; border: 1px solid #ddd;">${userAgent || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Referrer:</td><td style="padding: 8px; border: 1px solid #ddd;">${referrer || 'Direct'}</td></tr>
              </table>
              <br/>
              <p style="font-size: 12px; color: #777;">Sent automatically by your Portfolio App.</p>
            </div>
          `,
        });
        console.log('Resume download email notification sent successfully!');
      } catch (mailError) {
        console.error('Nodemailer error (check EMAIL_USER / EMAIL_PASS in environment variables):', mailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Resume download recorded in MongoDB and notification triggered!',
      downloadId: downloadLog._id,
    });
  } catch (error) {
    console.error('Error tracking resume download:', error);
    res.status(500).json({ success: false, error: 'Failed to record resume download.' });
  }
});

// GET /api/notify-resume-download - Retrieve download logs from MongoDB
app.get(['/api/notify-resume-download', '/notify-resume-download'], async (req, res) => {
  try {
    await connectToDatabase();
    const downloads = await ResumeDownload.find().sort({ downloadedAt: -1 }).limit(50);
    res.json({ success: true, count: downloads.length, data: downloads });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch resume downloads.' });
  }
});

// Health check endpoint
app.get(['/api/health', '/health'], async (req, res) => {
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

// Catch-all 404 JSON middleware to ensure server always returns valid JSON
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.url} not found.` });
});

export default function handler(req, res) {
  return app(req, res);
}
