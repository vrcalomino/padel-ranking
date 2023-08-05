const dotenv = require('dotenv');

// Ruta absoluta al archivo .env
const envPath = '../.env';
console.log(envPath);

// Lee el contenido del archivo .env si existe
dotenv.config({ path: envPath });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

module.exports = {
  MONGODB_URI,
  PORT,
  DISCORD_TOKEN,
  CHANNEL_ID,
};
