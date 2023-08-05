const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Construye la ruta absoluta al archivo .env desde la raíz del repositorio
const envPath = path.join(__dirname, '.env');

// Lee el contenido del archivo .env si existe
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  dotenv.parse(envContent);
}

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
