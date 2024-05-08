import mongoose, { Schema } from "mongoose";

const flamiTradeShema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    flami_id: {
        type: mongoose.Types.ObjectId
    },
    flamis_positions: {
        type: Map,
        of: new Schema({
            latitude: Number,
            longitude: Number,
        })
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
    statics: {
        getAllUserTrade (user_id) {
            return this.find({ user_id: user_id }).sort({created_at: -1});
        },
        getAllFlamiTrade (flami_id) {
            return this.find({ flami_id: flami_id }).sort({created_at: -1});
        }
    }
});

export default mongoose.model("FlamiTrade", flamiTradeShema);