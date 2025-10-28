// server.js
import 'dotenv/config'; // load environment variables
import express from 'express';// backend application
import cors from 'cors'; // connect backend with frontend
import connectDB from './configs/db.js';// database connection
import User from './models/user.js';
import bcrypt from 'bcryptjs'; // <- bcryptjs (no native build)

const app = express(); 
const port = 3000;

// connect to database
await connectDB();

// middleware
app.use(express.json());//call from backend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// simple logger to debug incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  next();
});

// root
app.get('/', (req, res) => res.send('Server is Live')); // test server

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, image } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password (bcryptjs sync)
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      _id: email,
      name,
      email,
      image: image || 'default.jpg',
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (bcryptjs sync)
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: { name: user.name, email: user.email, image: user.image },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`)); // start server  
