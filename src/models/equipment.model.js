import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
    assetTag: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['video', 'audio', 'informatique'],
    },
    dailyLateFeeCents: {
        type: Number,
        required: true,
        min: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    checkoutCount: {
        type: Number,
        default: 0
    }
})

export const Equipment = mongoose.model('Equipment', equipmentSchema);