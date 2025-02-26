require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

// Routes
app.use("/api", routes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

// Route d'accueil supplémentaire (optionnelle)
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de l'université internationale de Cocody !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
