const express = require("express");
const router = express.Router();

const { admin, db } = require("../util/admin");
const { FBAuth } = require("../util/auth");

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("topics").get();
    if (!snapshot.error) {
      let topics = [];
      snapshot.forEach((doc) => {
        topics.push(doc.data());
      });
      res.send(topics).status(200);
    } else {
      res.send("No topics found..").status(200);
    }
  } catch (err) {
    res.json(err).status(400);
    console.error(err);
  }
});

router.post("/", FBAuth, async (req, res) => {
  try {
    const topic = {
      title: req.body.title,
      content: req.body.content,
      user: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const doc = await db.collection("topics").add(topic);
    res.send(`Topic ${doc.id} added.`).status(200);
  } catch (err) {
    res.json(err).status(400);
    console.error(err);
  }
});

router.get("/:id", (req, res) => {});

module.exports = router;
