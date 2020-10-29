const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("test");
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

module.exports = router;
