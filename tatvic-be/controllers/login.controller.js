const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const Users = require("../models/User");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify goggle Auth token and return user obj
router.post("/login/google", async (req, res) => {
  const { token } = req.body;
  client
    .verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(async (data) => {
      const { sub: googleUserId, email, picture, name } = data.getPayload();
      const defaultUser = {
        name,
        username: email,
        googleUserId,
        profilePic: picture,
      };
      const users = await Users.findOrCreate({
        where: { googleUserId },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error when signing up", err);
        callback(err, null);
      });
      res.status(201).send(users[0]);
    })
    .catch((error) => {
      res.status(400).send({ message: error.message });
    });
});

module.exports = router;
