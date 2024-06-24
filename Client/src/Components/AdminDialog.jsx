import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AdminDialog = ({ visible, adminForm, onChange, onClose, onSubmit }) => {
  return (
    <Dialog header={adminForm._id ? 'Edit Admin' : 'Add Admin'} visible={visible} style={{ width: '50vw' }} onHide={onClose}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText id="name" name="name" value={adminForm.name} onChange={onChange} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" name="email" value={adminForm.email} onChange={onChange} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText id="password" name="password" type="password" value={adminForm.password} onChange={onChange} />
        </div>
      </div>
      <div className="p-d-flex p-jc-end">
        <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" />
        <Button label="Save" icon="pi pi-check" onClick={onSubmit} autoFocus />
      </div>
    </Dialog>
  );
};

export default AdminDialog;
