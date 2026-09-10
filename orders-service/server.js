const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/orders-db", { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send({ message: "Pedido realizado", order });
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({ message: "Orden actualizada", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
});

app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({ message: "Orden eliminada", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error });
  }
});

app.listen(4003, () => console.log("📦 Servicio de Pedidos en http://localhost:4003"));
