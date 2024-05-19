import mongoose from "mongoose";

const flamiShema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  cosmetics: [
    { id: { type: String } }
  ]
});

export default mongoose.model("Flami", flamiShema);