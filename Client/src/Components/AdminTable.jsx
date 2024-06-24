import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const AdminTable = ({ admins, onEdit, onDelete }) => {
  return (
    <DataTable value={admins} paginator rows={10}>
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column
        header="Actions"
        body={(rowData) => (
          <div>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => onEdit(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData._id)} />
          </div>
        )}
      />
    </DataTable>
  );
};

export default AdminTable;
