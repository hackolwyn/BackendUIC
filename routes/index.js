const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const { getHome } = require("../controllers/indexController");

// Route d'accueil
router.get("/", getHome);

// Documentation Swagger
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ... Autres routes si nécessaire
module.exports = router;
