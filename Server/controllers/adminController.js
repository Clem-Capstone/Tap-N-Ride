import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

// @desc Get all admins
// @route GET /api/admin/admins
// @access Private
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

// @desc Update admin
// @route PUT /api/admin/admins/:id
// @access Private
const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, username, email, role, status } = req.body;

  const admin = await Admin.findById(id);

  if (admin) {
    admin.name = name || admin.name;
    admin.username = username || admin.username;
    admin.email = email || admin.email;
    admin.role = role || admin.role;
    admin.status = status || admin.status;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc Delete admin
// @route DELETE /api/admin/admins/:id
// @access Private
const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);

  if (admin) {
    await Admin.deleteOne({ _id: id });
    res.json({ message: 'Admin removed' });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

export { getAdmins, updateAdmin, deleteAdmin };
