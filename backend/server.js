import dotEnv from 'dotenv';
import fs from 'fs';
import https from 'https';
import app from './src/app.js';

dotEnv.config();

const PORT = process.env.SERVER_PORT;

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
