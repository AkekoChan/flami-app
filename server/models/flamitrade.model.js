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
            return this.findOne({ $where: () => 
                this.owners.flasher === user._id || this.owners.sender === user._id
            }).sort({ created_at: 'desc' });
        },
        getFlamiTrailing (flami) {
            return this.find({ $where: () =>
                this.flamis.flasher === flami._id || this.flamis.sender === flami._id
            }).sort({ created_at: 'desc' });
        }
    }
});

export default mongoose.model("FlamiTrade", flamiTradeShema);