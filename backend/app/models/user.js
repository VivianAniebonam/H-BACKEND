// const mongoose = require("mongoose");
// const crypto = require("crypto");

// const Schema = mongoose.Schema;
// const UserSchema = new Schema(
//   {
//     username: {
//       type: String,
//       unique:true,
//         required: "Username is required",
//       trim: true,
//     },
//     profile: {
//       firstName: String,
//       lastName: String,
//     },
//     email: {
//       type: String,
//        required: "Email is required",
//       match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
//     },
//     hashed_password: {
//       type: String,
//       required: "Password is required",
//     },
//     phoneNumberFull: {
//       type: String,
//       required: "Full phone number is required",
//     },
//     address: {
//       street: String,
//       city: String,
//       country: String,
//       postalCode: String,
//       state: String,
//     },
//     salt: String,
//     created: {
//       type: Date,
//       default: Date.now,
//       immutable: true,
//     },
//     lastLogin: {
//       type: Date,
//       default: Date.now,
//     },

//   },
//   { timestamps: true }
// );

// UserSchema.virtual("password").set(function (password) {
//   if (password.length < 6) {
//     throw new Error("Password must be at least 6 characters.");
//   } else {
//     this.salt = Buffer.from(
//       crypto.randomBytes(16).toString("base64"),
//       "base64"
//     );
//     this.hashed_password = this.hashPassword(password);
//   }
// });

// UserSchema.methods.hashPassword = function (password) {
//   if (!password) {
//     throw new Error("Password is required");
//   }
//   if (!this.salt) {
//     this.salt = Buffer.from(
//       crypto.randomBytes(16).toString("base64"),
//       "base64"
//     );
//   }

//   return crypto
//     .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
//     .toString("base64");
// };

// UserSchema.methods.authenticate = function (password) {
//   return this.hashed_password === this.hashPassword(password);
// };

// UserSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//    delete ret._id;
//     delete ret.hashed_password;
//     delete ret.salt;
//   },
// });

// module.exports = mongoose.model("User", UserSchema,'Users');

// /*
// {
//   "_id": {
//     "$oid": "65d189432ac4d6923022db5b"
//   },
//   "username": "johndoe",
//   "profile": {
//     "firstName": "John",
//     "lastName": "Doe"
//   },
//   "email": "john.doe@example.com",
//   "hashed_password": " ",
//   "address": {
//     "street": "123 Main St",
//     "city": "Awkuzu",
//     "country": "Nigeria",
//     "postalCode": "12345",
//     "state": "Anambra State"
//   },
//   "lastLogin": {
//     "$date": "2024-01-01T09:00:00.000Z"
//   }
// }
// */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "First name is required",
    },
    lastName: {
      type: String,
      required: "Last name is required",
    },
    username: {
      type: String,
      unique: true,
      required: "Username is required",
      trim: true,
    },
    profile: {
      firstName: String,
      lastName: String,
    },
    email: {
      type: String,
      required: "Email is required",
      match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
    },
    hashed_password: {
      type: String,
      required: "Password is required",
    },
    phoneNumberFull: {
      type: String,
      required: "Full phone number is required",
    },
    address: {
      street: String,
      city: String,
      country: String,
      postalCode: String,
      state: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password").set(function (password) {
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  } else {
    this._password = password;
    this.hashed_password = bcrypt.hashSync(password, 10);
  }
});

UserSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.hashed_password);
};

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.hashed_password;
    delete ret.salt;
  },
});

module.exports = mongoose.model("User", UserSchema, "Users");
