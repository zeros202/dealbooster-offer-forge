
import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, Download, Trash2, RotateCcw } from 'lucide-react';

interface CanvasToolbarProps {
  onAddText: () => void;
  onExport: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  onAddText,
  onExport,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onAddText}
        className="flex items-center space-x-2"
      >
        <Type className="h-4 w-4" />
        <span>Add Text</span>
      </Button>
      
      <div className="h-4 w-px bg-gray-300" />
      
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="flex items-center space-x-2"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
      </Button>
    </div>
  );
};
