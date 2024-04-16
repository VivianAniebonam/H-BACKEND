const express = require("express");
const router = express.Router();

let userController = require("../controllers/users");
let authController = require("../controllers/auth");

router.post("/signin", authController.signin);

router.post("/create", userController.create);

//router.param("UserId", userController.UserId);
router.get("/getUserByUserId/:userId", authController.requireSignin, userController.getUserByUserId);
router.get("/get/:id", userController.read);
router.put("/edit/:userId", userController.updateUser);
router.delete("/remove/:userId", authController.requireSignin, authController.hasAuthorization, userController.remove);

module.exports = router;
