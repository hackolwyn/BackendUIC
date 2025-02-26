const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Inscription d'un utilisateur
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) { res.status(400); throw new Error("Utilisateur déjà existant"); }
  const user = await User.create({ username, password, role });
  res.status(201).json({ message: "Utilisateur créé avec succès", user });
});

// Connexion d'un utilisateur
exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error("Identifiants invalides"); }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Connexion réussie", token });
});

// ... Complétez getUserById, getAllUsers, createUser, updateUser, deleteUser selon vos besoins
