import dotEnv from 'dotenv';
import fs from 'fs';
import https from 'https';
import app from './src/app.js';

dotEnv.config();

const PORT = process.env.SERVER_PORT;

const options = {
  key: fs.readFileSync('certificado.key'),
  cert: fs.readFileSync('certificado.cert'),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
