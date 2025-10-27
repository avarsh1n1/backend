const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Sample data
var gadgets = [
  { id: 1, name: "Smartphone", model: "Galaxy S23", year: 2023 },
];

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Gadget Inventory API 🚀");
});

// Get all gadgets
app.get("/gadgets", (req, res) => {
  res.json(gadgets);
});

// Get gadget by ID
app.get("/gadgets/:gid", (req, res) => {
  const id = parseInt(req.params.gid);
  const gadget = gadgets.find((g) => g.id === id);

  if (gadget) {
    res.json(gadget);
  } else {
    res.status(404).json({ msg: "Gadget not found" });
  }
});

// Add new gadget
app.post("/gadgets", (req, res) => {
  const { id, name, model, year } = req.body;
  const newGadget = { id, name, model, year };

  gadgets.push(newGadget);
  res.json({ gadget: newGadget, msg: "Gadget added successfully ✅" });
});

// Update gadget
app.put("/gadgets/:gid", (req, res) => {
  const id = parseInt(req.params.gid);
  const { name, model, year } = req.body;

  const gadgetIndex = gadgets.findIndex((g) => g.id === id);

  if (gadgetIndex !== -1) {
    gadgets[gadgetIndex] = { ...gadgets[gadgetIndex], name, model, year };
    res.json({ updatedGadget: gadgets[gadgetIndex], msg: "Gadget updated successfully 🔧" });
  } else {
    res.status(404).json({ msg: "Gadget not found" });
  }
});

// Delete gadget
app.delete("/gadgets/:gid", (req, res) => {
  const id = parseInt(req.params.gid);
  const gadgetIndex = gadgets.findIndex((g) => g.id === id);

  if (gadgetIndex !== -1) {
    gadgets.splice(gadgetIndex, 1);
    res.json({ msg: "Gadget deleted successfully 🗑️" });
  } else {
    res.status(404).json({ msg: "Gadget not found" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server started on port 3000");
});
