import User from '../models/User.js';

export const tapIn = async (req, res) => {
  const { cardID, location } = req.body;

  try {
    const user = await User.findOne({ cardID });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isTappedIn) {
      return res.status(400).json({ message: 'User already tapped in' });
    }

    // Update the user's tap-in status
    user.isTappedIn = true;
    user.lastTapInPoint = location;
    user.lastTapInTime = new Date();

    await user.save();

    return res.status(200).json({ message: 'User tapped in successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
