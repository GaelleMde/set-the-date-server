// ❗This is an example of a User Model.
// TODO: Please make sure you edit the User model to whatever makes sense in your project.
const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be less than 20 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favorites: 
  [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Event'
  }],
 
  }, 
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
