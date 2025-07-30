const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const cookieParser=require('cookie-parser');
const protectedRoute = require('./routes/protected');

dotenv.config();
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://wellglimpse.vercel.app'
    ];

    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo error: ', err));
app.use('/api', protectedRoute);
app.use('/api/auth', authRoutes);
app.use('/api',passwordRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT,  '0.0.0.0', () =>{console.log(`Server running on port ${PORT}`)});
