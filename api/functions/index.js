const functions = require("firebase-functions");
const express = require("express");
const app = express();
const { db, admin } = require("./util/admin");

// Handlers
const { handleUserSignUp, handleUserLogin } = require("./handlers/auth");

// Import routes
const alternativesRoutes = require("./routes/alternatives");
const topicsRoutes = require("./routes/topics");

// Add routes middleware
app.use("/api/alternatives", alternativesRoutes);
app.use("/api/topics", topicsRoutes);

// Other routes
app.post("/api/signup", handleUserSignUp);
app.post("/api/login", handleUserLogin);

exports.app = functions.https.onRequest(app);
