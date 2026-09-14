const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost/users-db", { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: "Usuario registrado", user });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
});

app.listen(4001, () => console.log("🔹 Servicio de Usuarios en http://localhost:4001"));
