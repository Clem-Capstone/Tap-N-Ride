import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  const { lastName, firstName, middleName, cardID, balance } = req.body;

  if (!lastName || !firstName || !cardID) {
    return res.status(400).json({ message: 'Last name, first name, and card ID are required.' });
  }

  const user = new User({
    lastName,
    firstName,
    middleName,
    cardID,
    balance: balance || 0, // Default balance to 0 if not provided
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Detect card route (simply returning the card ID sent from ESP8266)
export const detectCard = async (req, res) => {
  try {
    const cardID = req.body.cardID;
    
    // Example logic: Find user by cardID
    const user = await User.findOne({ cardID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      cardID: user.cardID,
      lastName: user.lastName,
      firstName: user.firstName,
      middleName: user.middleName,
      balance: user.balance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
