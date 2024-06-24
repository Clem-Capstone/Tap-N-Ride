import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400).json({ message: 'Admin already exists' });
    return;
  }

  const admin = await Admin.create({ name, email, username, password });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  // Check if the login field is an email or username
  const admin = await Admin.findOne({ $or: [{ email: login }, { username: login }] });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email/username or password' });
  }
});

export { registerAdmin, loginAdmin };
