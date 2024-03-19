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
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
    statics: {
        getLastUserTrade (user) {
            return this.findOne({ $where: () => 
                this.owners.flasher === user._id || this.owners.sender === user._id
            }).sort({ created_at: 'desc' });
        }
    }
});

export default mongoose.model("FlamiTrade", flamiTradeShema);