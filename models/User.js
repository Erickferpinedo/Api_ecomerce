import bcrypt from "bcryptjs"

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requiered: true,
    },
    email: String,
    password: {
      type: String,
      requiered: true,
    },
    address: String,
    phone: Number,
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

 userSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password,10)
  this.password = hash
  next()
 })

const User = mongoose.model("User", userSchema);

export default User;