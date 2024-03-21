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
  kept_flami_id: {
    type: mongoose.Types.ObjectId
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
    name: `Flami de ${this.name}`,
    owner_id: this._id,
    cosmetics: { "Sport de combat": "BoxeGants", "Sport de course": "Chaussures", "Sport aquatique": "Lunettes", "Sport collectif": "Basket", "Sport de plage": "Volley", "Sport de force": "Haltere" }[this.metadata.favorite_sport] ?? "Chaussures"
  });
  this.flami_id = flami._id;
});

export default mongoose.model("User", userSchema);