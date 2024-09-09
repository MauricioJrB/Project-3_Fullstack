// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import dotEnv from 'dotenv';

dotEnv.config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { maxPoolSize: 2 });

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => {
  console.log('DB connection successful');
});
db.on('disconnected', () => console.log('DB disconnected'));

export default db;
