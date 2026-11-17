import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  status: {
    type: String,
    enum: ['returned', 'ongoing'],
    required: true
  },
  returnedAt: {
    type: Date,
    default: null
  }
});

export const Loan = mongoose.model('Loan', loanSchema);