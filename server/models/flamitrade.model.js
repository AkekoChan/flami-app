import mongoose from "mongoose";

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
        of: {
            lat: Number,
            long: Number
        }
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
    statics: {
        getLastUserTrade (user_id) {
            return this.findOne({ $where: 
                `this.owners.flasher === ${user_id.$oid} || this.owners.sender === ${user_id.$oid};`
            }).sort({ created_at: 'desc' });
        }
    }
});

export default mongoose.model("FlamiTrade", flamiTradeShema);