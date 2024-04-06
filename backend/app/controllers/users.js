const User = require("../models/user");
const UserModel = require("../models/user");

//create a new user
module.exports.create = async function (req, res, next) {
  try {
    console.log(req.body);

    // Extract countryCode and phoneNumber from req.body
    const { phoneNumberFull, phoneNumber, ...restOfBody } = req.body;

   

    // Create a new user based on the incoming JSON data, including the phoneNumberFull
    const newUser = new UserModel({
      ...restOfBody,
      phoneNumberFull, // Assuming your UserModel has this field
      // If your user model expects the phoneNumber and countryCode as separate fields, keep them.
      phoneNumber: parseInt(phoneNumber, 10), // Convert phoneNumber to number if your model expects a number type
    });

    // Save the new user to the database
    const result = await newUser.save();

    res.json({
      success: true,
      message: "User created successfully.",
      user: result, // Optionally send back the created user details
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


//Fetching a user by using his/her Id
exports.getUserByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId:", userId);

    const user = await User.findOne({ userId: userId });
    if (!user) {
      console.log("User not found for userId:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Log the fetched user details
    console.log("Fetched user details:", user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};


// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      updatedData,
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};



//Reading user information via Id
exports.read = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user" });
    console.log(err);
  }
};


//Deleting a User 
module.exports.remove = async (req, res, next) => {
  try {
    let id = req.params.userId;
    let result = await UserModel.deleteOne({ _id: id });
    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "User deleted sucessfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("User not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
