const _ = require("lodash");

const { admin, db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
firebase.initializeApp(config);

const { validateSignUpData, validateLoginData } = require("../util/validators");

exports.handleUserSignUp = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    };

    const { errors, valid } = validateSignUpData(newUser);

    if (valid) {
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      if (data.user) {
        const doc = await db.collection("users").add({
          uid: data.user.uid,
          name: newUser.name,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        const token = await data.user.getIdToken();
        res.status(201).json({ token });
      }
    } else {
      res.json(errors);
    }
  } catch (err) {
    res.json(err).status(400);
    console.error(err);
  }
};

exports.handleUserLogin = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const { errors, valid } = validateLoginData(user);

    if (valid) {
      const data = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      const token = await data.user.getIdToken();
      return res.json({ token });
    } else {
      return res.json(errors);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
