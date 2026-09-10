const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/products-db", { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send({ message: "Producto agregado", product });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send({ message: "Producto eliminado", deletedProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4002, () => console.log("🛒 Servicio de Productos en http://localhost:4002"));
