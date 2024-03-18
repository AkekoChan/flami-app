import mongoose from "mongoose";
import flamiModel from "./flami.model.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  flami_id: {
    type: mongoose.Types.ObjectId
  },
  keeped_flami_id: {
    type: mongoose.Types.ObjectId
  },
  badges: {
    sports: [
      { id: { type: Number }, level: { type: Number, min: 0, max: 2 } }
    ],
    etapes: [
      { id: { type: Number } }
    ]
  },
  owned_cosmetics: [
    { id: { type: Number } }
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
    min: 13
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
    name: `Flami de ${this.name}`,
    owner_id: this._id,
    cosmetics: this.owned_cosmetics
  });
  this.flami_id = flami._id;
});

export default mongoose.model("User", userSchema);