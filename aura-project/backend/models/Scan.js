import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  isAiGenerated: {
    type: Boolean,
    required: true
  },
  realnessPercentage: {
    type: Number,
    required: true
  },
  manipulationFlags: [{
    type: String
  }],
  exposureLinks: [{
    name: String,
    url: String
  }],
  recommendations: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
