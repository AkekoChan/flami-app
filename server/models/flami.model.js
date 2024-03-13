import mongoose from "mongoose";

const flamiShema = new mongoose.Schema({
  name: {
    type: String
  },
  owner_id: {
    type: mongoose.Types.ObjectId
  },
  current_sharer_id: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now
  },
  cosmetics: {
    type: Array,
    default: []
  },
  location: {
    lat: Number,
    long: Number
  },
  stats: {
    strength: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 1
    },
    dexterity: {
      type: Number,
      default: 1
    }
  },
  stamina: {
    type: Number,
    default: 3
  },
  last_action_time: {
    type: Date
  }
}, {
    statics: {

    }
});

export default mongoose.model("Flami", flamiShema);