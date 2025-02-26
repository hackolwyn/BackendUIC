const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Si une méthode n'est pas encore définie, on utilise un stub
router.get("/:id", userController.getUserById || ((req, res) => res.send("getUserById not implemented")));
router.get("/", userController.getAllUsers || ((req, res) => res.send("getAllUsers not implemented")));
router.post("/", userController.createUser || ((req, res) => res.send("createUser not implemented")));
router.put("/:id", userController.updateUser || ((req, res) => res.send("updateUser not implemented")));
router.delete("/:id", userController.deleteUser || ((req, res) => res.send("deleteUser not implemented")));

module.exports = router;
