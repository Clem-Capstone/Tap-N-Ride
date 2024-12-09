import User from '../models/User.js';
import Route from '../models/Route.js'; // Assuming you have a Route model for the locations

export const tapOut = async (req, res) => {
  const { cardID, location } = req.body;

  try {
    const user = await User.findOne({ cardID });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isTappedIn) {
      return res.status(400).json({ message: 'User has not tapped in' });
    }

    // Calculate fare based on distance
    const lastRoute = await Route.findOne({ area: user.lastTapInPoint });
    const currentRoute = await Route.findOne({ area: location });

    if (!lastRoute || !currentRoute) {
      return res.status(400).json({ message: 'Invalid route information' });
    }

    const distanceTraveled = Math.abs(currentRoute.km - lastRoute.km);
    const fare = distanceTraveled * 2.20; // Example: fare calculation (10 currency units per km)

    if (user.balance < fare) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct the fare from user's balance
    user.balance -= fare;

    // Reset the user's tap-in status
    user.isTappedIn = false;
    user.lastTapInPoint = null;
    user.lastTapInTime = null;

    await user.save();

    return res.status(200).json({ message: 'User tapped out successfully', fare });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
