const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const swaggerDocs = require('./swagger');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use('/api/students', studentRoutes);

// Swagger documentation
swaggerDocs(app);

// Middleware pour capturer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
