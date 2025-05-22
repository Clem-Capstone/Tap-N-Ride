import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  abbreviation: { type: String, required: true },
  name: { type: String, required: true },
  branchStation: { type: String, required: true },
  dateTimeAdded: { type: Date, default: Date.now },
  isOpen: { type: Boolean, default: true },
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
