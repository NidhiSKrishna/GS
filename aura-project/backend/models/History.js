import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true,
    enum: ['AI-generated', 'Real']
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  reasons: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model('History', historySchema);

export default History;
