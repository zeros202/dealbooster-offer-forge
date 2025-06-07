
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  variant?: 'default' | 'compact';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  variant = 'default' 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
  });

  if (variant === 'compact') {
    return (
      <Button
        {...getRootProps()}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <input {...getInputProps()} />
        <Upload className="h-4 w-4" />
        <span>Change Image</span>
      </Button>
    );
  }

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "p-8 border-2 border-dashed cursor-pointer transition-colors hover:bg-gray-50",
        isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"
      )}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Background Image
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {isDragActive 
            ? "Drop your image here..." 
            : "Drag and drop an image, or click to browse"
          }
        </p>
        <Button variant="outline" className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Choose Image</span>
        </Button>
        <p className="text-xs text-gray-400 mt-2">
          Supports JPG, PNG, GIF, WebP
        </p>
      </div>
    </Card>
  );
};
