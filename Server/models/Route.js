import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  km: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

export default Route;
