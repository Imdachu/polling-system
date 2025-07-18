const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit'); // ✅ Added import
const { RateLimiterMemory } = require('rate-limiter-flexible'); // ✅ For Socket.io
const Poll = require('./models/poll');

// Load environment variables
dotenv.config();

// ✅ Rate limiter for HTTP poll creation (Express)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many poll creations. Try again later.',
});

// ✅ Rate limiter for Socket.io voting
const voteLimiter = new RateLimiterMemory({
  points: 5, // Max 5 votes
  duration: 60, // Per 60 seconds
});

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));


// Route to render the poll creation form
app.get('/create-poll', (req, res) => {
  console.log('Attempting to render createPoll.ejs'); // Debugging
  try {
    res.render('createPoll');
  } catch (err) {
    console.error('Error rendering createPoll.ejs:', err); // Debugging
    res.status(500).json({ error: 'Server error' });
  }
});

// 👇 Add the route to view a specific poll
app.get('/poll/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).send('Poll not found');
    res.render('poll', { poll }); // Render the poll page with the poll data
  } catch (err) {
    console.error('Error fetching poll:', err);
    res.status(500).send('Server error');
  }
});

// Apply poll creation rate limiter to the route (Express)
app.use('/api/polls/create', apiLimiter);

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a vote event
  socket.on('vote', async (data) => {
    const { pollId, option, userIdentifier } = data;
    const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

    try {
      // ✅ Apply Socket.io rate limiting
      await voteLimiter.consume(ip);

      // Existing logic (validation, saving votes, etc.)
      if (!pollId || !option || !userIdentifier) {
        throw new Error('Invalid vote data');
      }

      const poll = await Poll.findById(pollId);
      if (!poll) throw new Error('Poll not found');

      const existingVote = poll.votes.find(vote => vote.user === userIdentifier);
      if (existingVote) {
        throw new Error('User already voted');
      }

      poll.votes.push({ user: userIdentifier, option });
      await poll.save();

      io.emit('pollUpdate', poll);
    } catch (err) {
      if (err instanceof Error) {
        socket.emit('error', err.message);
      } else {
        // Rate limit error
        socket.emit('error', 'Too many votes. Try again later.');
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Polling System is running!');
});

// Middleware to parse JSON
app.use(express.json());

// Use the polls routes
const pollsRouter = require('./routes/polls');
app.use('/api/polls', pollsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});