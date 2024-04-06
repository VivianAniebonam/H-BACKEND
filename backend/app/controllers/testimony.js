const Testimony = require("../models/testimony");

// Create a new testimony
module.exports.createTestimony = async function (req, res, next) {
  try {
    // Extracting the fields from the request body based on frontend structure
    const { name, title, message } = req.body;
    
    // Splitting the name into first and last names
    let [firstName, ...lastNameParts] = name.split(' ');
    let lastName = lastNameParts.join(' ');

    // Creating a new testimony with the mapped fields
    const newTestimonyData = {
      firstName: firstName,
      lastName: lastName || '', // Use an empty string if lastName is not provided
      title: title,
      content: message, // Assuming the 'message' field from frontend should be mapped to 'content' in the backend
      // Other fields like datePosted, rating, isVisible can keep their default values
    };

    const newTestimony = new Testimony(newTestimonyData);

    // Save the new testimony to the database
    const result = await newTestimony.save();

    res.json({
      success: true,
      message: "Testimony created successfully.",
      testimony: result, // Optionally send back the created testimony details
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get testimony by ID
exports.getTestimonyById = async (req, res, next) => {
  try {
    const testimonyId = req.params.testimonyId;
    console.log("Received testimonyId:", testimonyId);

    const testimony = await Testimony.findById(testimonyId);
    if (!testimony) {
      console.log("Testimony not found for ID:", testimonyId);
      return res.status(404).json({ message: "Testimony not found" });
    }

    // Log the fetched testimony details
    console.log("Fetched testimony details:", testimony);

    res.status(200).json(testimony);
  } catch (error) {
    console.error("Error fetching testimony:", error);
    next(error);
  }
};

// Update a testimony
exports.updateTestimony = async (req, res) => {
  try {
    const { testimonyId } = req.params;
    const updatedData = req.body;

    const updatedTestimony = await Testimony.findByIdAndUpdate(
      testimonyId,
      updatedData,
      { new: true }
    );

    if (updatedTestimony) {
      res.status(200).json({
        message: "Testimony updated successfully",
        testimony: updatedTestimony,
      });
    } else {
      res.status(404).json({ message: "Testimony not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating testimony",
      error: error.message,
    });
  }
};

// Delete a testimony
module.exports.removeTestimony = async (req, res, next) => {
  try {
    let testimonyId = req.params.testimonyId;
    let result = await Testimony.deleteOne({ _id: testimonyId });
    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: "Testimony deleted successfully.",
      });
    } else {
      // Express will catch this on its own.
      throw new Error("Testimony not deleted. Are you sure it exists?");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};



exports.listTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.find(); // Find all testimonies
    res.json(testimonies); // Send back the list of testimonies
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch testimonies', error: error.message });
  }
};