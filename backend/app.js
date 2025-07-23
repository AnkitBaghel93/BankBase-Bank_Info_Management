const express = require('express');
const cors = require('cors');
const conn = require('./utilise/conn');
require('dotenv').config();
const authRoutes = require('./routes/AuthRoutes');
const bankRoutes = require('./routes/BankRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const allowedOrigins = ['https://bankbase-frontend.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to DB
conn();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bank', bankRoutes);

// Root
app.get('/', (req, res) => {
  res.send("Welcome to the server");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
