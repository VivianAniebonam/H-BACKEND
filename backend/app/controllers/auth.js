let User = require("../models/user");
let config = require("../../config/config");
let jwt = require("jsonwebtoken");
const { expressjwt } = require('express-jwt');

module.exports.signin = async function (req, res, next) {
  try {
    console.log(req.body)
    // Validate email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and password must be provided" });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");

    // Update lastLogin before issuing the token
    user.lastLogin = new Date(); // Set the lastLogin field to the current date and time
    await user.save(); // Save the updated user data


    // Issue the token
    let payload = {
      id: user._id,
      userId:user.userId,
      username: user.username,
    };

    let token = jwt.sign(payload, config.SECRETKEY, {
      algorithm: "HS512",
      expiresIn: "1d",
    });

    // Send the token to the client
    return res.status(200).json({
      success: true,
      token: token,
      user: payload,
    });
  } catch (error) {
    console.log(error);
    const errorMessage = error?.message || "Default error message";
    res.status(500).json({ error: errorMessage });
  }
};
// Checks the token validation
module.exports.requireSignin = expressjwt({
  secret: config.SECRETKEY,
  algorithms: ["HS512"],
  userProperty: "auth",
});

// Checks if the requester is allowed to perform the acction.
module.exports.hasAuthorization = async function (req, res, next) {
  let authorized =
    req.auth && req.user && req.user.username == req.auth.username;

  if (!authorized) {
    return res.status("403").json({
      success: false,
      message: "User is not authorized",
    });
  }
  next();
};
