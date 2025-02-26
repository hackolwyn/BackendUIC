const { body, validationResult } = require("express-validator");

const validateStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("age").isInt({ min: 1 }).withMessage("L'âge doit être un nombre entier positif"),
  body("email").isEmail().withMessage("Valid email is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateStudent;
