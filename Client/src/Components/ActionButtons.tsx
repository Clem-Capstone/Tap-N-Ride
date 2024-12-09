import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete: () => void;
  showEdit?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete, showEdit = true }) => {
  return (
    <div className="flex space-x-2">
      {showEdit && (
        <button
          onClick={onEdit}
          className="flex items-center justify-center p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={onDelete}
        className="flex items-center justify-center p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ActionButtons;