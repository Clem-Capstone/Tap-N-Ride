import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

const AdminToolbar = ({ onAdd }) => {
  return (
    <Toolbar className="mb-4">
      <Button label="Add Admin" icon="pi pi-plus" onClick={onAdd} />
    </Toolbar>
  );
};

export default AdminToolbar;
