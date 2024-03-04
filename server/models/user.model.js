import mongoose from "mongoose";
import flamiModel from "./flami.model.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: true,
    min: 13
  },
  flami: {
    type: Number,
    ref: flamiModel
  },
  badges: {
    type: Array,
  },
  metadata: [{
    favorite_sport: {
      type: String,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    intent: {
      type: String,
      required: true
    }
  }]
}, 
{ 
  statics: {
    findByEmail (email) {
      return this.findOne({ email: new RegExp(email, 'i') });
    }
  }
});

userSchema.pre('save', async function () {
  let flami = await flamiModel.create({

  });
  this.flami = flami._id;
});

export default mongoose.model("User", userSchema);
