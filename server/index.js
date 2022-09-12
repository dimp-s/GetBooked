import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';

const app = express();
dotenv.config();
const connect = async () => {};
try {
  await mongoose.connect(process.env.MONGO);
  console.log('MongoDB connection established!');
} catch (error) {
  throw error;
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDb disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDb connected!');
});

//middlewares
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'Something went wrong!';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(5000, (req, res) => {
  console.log('Server running!');
});
