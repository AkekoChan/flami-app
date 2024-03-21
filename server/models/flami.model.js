import mongoose from "mongoose";

const flamiShema = new mongoose.Schema({
  name: {
    type: String
  },
  owner_id: {
    type: mongoose.Types.ObjectId
  },
  keeper_id: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now
  },
  cosmetics: [
    { id: { type: String } }
  ],
  stats: {
    strength: {
      type: Number,
      default: 1,
      max: 10
    },
    speed: {
      type: Number,
      default: 1,
      max: 10
    },
    dexterity: {
      type: Number,
      default: 1,
      max: 10
    }
  },
  stamina: {
    type: Number,
    default: 3,
    max: 3
  },
  last_action_time: {
    type: Date
  }
}, {
    statics: {

    }
});

export default mongoose.model("Flami", flamiShema);