import mongoose from 'mongoose';

const BusSchema = new mongoose.Schema({
  busID: {
    type: String,
    required: true,
    unique: true,
  },
  routeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true, // Ensure every bus is linked to a route
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'out-of-service'],
    default: 'inactive',
  },
  area: {
    type: String,
    required: true, // Ensure area is specified for every bus
  },
}, { timestamps: true });

const Bus = mongoose.model('Bus', BusSchema);

export default Bus;
