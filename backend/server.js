import dotEnv from 'dotenv';
import app from './src/app.js';

dotEnv.config();

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
