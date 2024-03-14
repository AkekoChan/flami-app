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
  owned_cosmetics: {
    type: Array,
    default: []
  },
  flami_id: {
    type: mongoose.Types.ObjectId
  },
  shared_flami: {
    id: {
      type: mongoose.Types.ObjectId
    },
    shared_date: {
      type: String
    }
  },
  badges: {
    type: Array,
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
  let sports = { "Sport de combat": 0, "Sport de course": 1, "Sport aquatique": 2, "Sport collectif": 3, "Sport de plage": 4, "Sport de force": 5 }
  let givenCosmetics = sports[this.metadata.favorite_sport] !== undefined ? [sports[this.metadata.favorite_sport]] : [];
  let flami = await flamiModel.create({
    name: `Flami de ${this.name}`,
    owner_id: this._id,
    cosmetics: givenCosmetics
  });
  this.flami_id = flami._id;
  this.owned_cosmetics = givenCosmetics;
});

export default mongoose.model("User", userSchema);