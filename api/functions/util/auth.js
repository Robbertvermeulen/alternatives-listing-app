const { admin, db } = require("../util/admin");

exports.FBAuth = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found.");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    const data = await db
      .collection("users")
      .where("uid", "==", req.user.uid)
      .limit(1)
      .get();
    req.user.name = data.docs[0].data().name;
    return next();
  } catch (err) {
    console.error("Error while verifying token", err);
    return res.status(403).json(err);
  }
};
