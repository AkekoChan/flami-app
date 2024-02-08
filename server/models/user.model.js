import mongoose from "mongoose";

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
  flami_id: {
    type: Number,
    required: true
  },
  badges: {
    type: Array,
    required: true
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
      return this.find({ email: new RegExp(email, 'i') });
    }
  }
});

export default mongoose.model("User", userSchema);
