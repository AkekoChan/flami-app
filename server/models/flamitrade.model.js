import mongoose, { Schema } from "mongoose";

const flamiTradeShema = new mongoose.Schema({
    owners: {
        flasher: {
            type: mongoose.Types.ObjectId
        },
        sender: {
            type: mongoose.Types.ObjectId
        }
    },
    flamis: {
        flasher: {
            type: mongoose.Types.ObjectId
        },
        sender: {
            type: mongoose.Types.ObjectId
        }
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
        getLastUserTrade (user) {
            return this.findOne({
                $or: [
                  {"owners.flasher": user._id},
                  {"owners.sender": user._id}
                ]
            }).sort({created_at: -1})
        },
        getFlamiTrailing (flami) {
            return this.find({
                $or: [
                  {"flamis.flasher": flami._id},
                  {"flamis.sender": flami._id}
                ]
            }).sort({created_at: -1})
        }
    }
});

export default mongoose.model("FlamiTrade", flamiTradeShema);