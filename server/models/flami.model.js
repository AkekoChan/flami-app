import mongoose from "mongoose";

const flamiShema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Types.ObjectId
  },
  trader_id: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now
  },
  cosmetics: [
    { id: { type: String } }
  ],
  last_action_time: {
    type: Date
  }
});

export default mongoose.model("Flami", flamiShema);