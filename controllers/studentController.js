const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const { validationResult } = require("express-validator");

// Récupérer un étudiant par id
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) { res.status(404); throw new Error("Étudiant non trouvé"); }
  res.json(student);
});

// Récupérer tous les étudiants avec pagination
const getAllStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const students = await Student.find().limit(limit * 1).skip((page - 1) * limit);
  const count = await Student.countDocuments();
  res.json({ students, totalPages: Math.ceil(count / limit), currentPage: page });
});

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json({ students });
});

// Créer un nouvel étudiant (avec validation des champs)
const createStudent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { res.status(400); throw new Error("Données invalides"); }
  const { name, age, email } = req.body;
  const newStudent = new Student({ name, age, email });
  await newStudent.save();
  res.status(201).json({ message: "Étudiant ajouté avec succès", student: newStudent });
});

// Mettre à jour un étudiant
const updateStudent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { res.status(400); throw new Error("Données invalides"); }
  const { name, age, email } = req.body;
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, age, email }, { new: true });
  if (!updatedStudent) { res.status(404); throw new Error("Étudiant non trouvé"); }
  res.json(updatedStudent);
});

// Supprimer un étudiant
const deleteStudent = asyncHandler(async (req, res) => {
  const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  if (!deletedStudent) { res.status(404); throw new Error("Étudiant non trouvé"); }
  res.json({ message: "Étudiant supprimé avec succès" });
});

module.exports = { getStudents, createStudent, getStudentById, updateStudent, deleteStudent, getAllStudents };
