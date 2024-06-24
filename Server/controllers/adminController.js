import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

// Get all admins
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

// Delete an admin by ID
const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    await admin.remove();
    res.json({ message: 'Admin removed' });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// Update an admin by ID
const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

export { getAdmins, deleteAdmin, updateAdmin };
