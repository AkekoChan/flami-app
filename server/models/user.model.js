import mongoose from "mongoose";
import flamiModel from "./flami.model.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  trade_palier: {
    type: Number,
    default: 0
  },
  flami_id: {
    type: mongoose.Types.ObjectId,
    ref: 'flamis'
  },
  badges: [
    { id: { type: String }, created_at: { type: Date, default: Date.now() } }
  ],
  owned_cosmetics: [
    { id: { type: String }, created_at: { type: Date, default: Date.now() } }
  ],
  email: {
    type: String,
    required: true,
    unique: true
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 120
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  metadata: {
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
  }
},
{
  statics: {
    findByEmail (email) {
      return this.findOne({ email: new RegExp(email, 'i') });
    }
  }
});

userSchema.post('validate', async function () {
  if(await this.constructor.findByEmail(this.email)) return;
  let flami = await flamiModel.create({
    owner_id: this._id,
    cosmetics: this.owned_cosmetics
  });
  
  this.flami_id = flami._id;
});

export default mongoose.model("User", userSchema);