const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Sample data
var stationery = [
    {id: 1, name: "DOMS Neon Pencil", color: "Orange", qty: 10},
    {id: 2, name: "Reynold Trimax", color: "Blue", qty: 170},
    {id: 3, name: "Pentonic Gel 2.0", color: "Black", qty: 120},
   
];

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Stationery Store API🚀");
});

// Get all gadgets
app.get("/stationery", (req, res) => {
  res.json(stationery);
});

// Get gadget by ID
app.get("/stationery/:sid", (req, res) => {
  const id = parseInt(req.params.sid);
  const item = stationery.find((s) => s.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ msg: "Stationery Item not found! :(" });
  }
});

// Add new gadget
app.post("/stationery", (req, res) => {
  const { id, name, color, qty } = req.body;
  const newStationery = { id, name, color, qty };

  stationery.push(newStationery);
  res.json({ stationery: newStationery, msg: "Item added successfully! :) " });
});

// Update gadget
app.put("/stationery/:sid", (req, res) => {
  const id = parseInt(req.params.sid);
  const { name, color, qty } = req.body;

  const index = stationery.findIndex((s) => s.id == id);

  if (index !== -1) {
    stationery[index] = { ...stationery[index], name, color, qty };
    res.json({ updatedStationery: stationery[index], msg: "Item updated successfully! :))" });
  } else {
    res.status(404).json({ msg: "Item not found! Oops :(" });
  }
});

// Delete gadget
app.delete("/stationery/:sid", (req, res) => {
  const id = parseInt(req.params.sid);
  const stationeryIndex = stationery.findIndex((s) => s.id == id);

  if (stationeryIndex !== -1) {
    stationery.splice(stationeryIndex, 1);
    res.json({ msg: "Item deleted successfully! XD 🗑️" });
  } else {
    res.status(404).json({ msg: "Item not found!" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
