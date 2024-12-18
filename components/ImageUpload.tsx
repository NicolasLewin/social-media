import React, { useCallback } from 'react';
import { ImagePlus, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
  label: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ImageUpload({ 
  value, 
  disabled, 
  onChange, 
  label 
}: ImageUploadProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onChange(base64);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const previewHeight = label.toLowerCase().includes('cover') ? 'h-32' : 'h-24';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleChange}
          className="hidden"
          id={`image-upload-${label}`}
        />
        
        {value ? (
          <div className={`relative ${previewHeight} w-full overflow-hidden rounded-xl`}>
            <img
              src={value}
              alt="Upload"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/70 hover:bg-black/90 
                       transition opacity-0 group-hover:opacity-100"
              type="button"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={`image-upload-${label}`}
            className={`w-full ${previewHeight} border-2 border-dotted border-gray-300 dark:border-gray-700 
                     flex flex-col items-center justify-center gap-2 rounded-xl 
                     cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition`}
          >
            <ImagePlus className="h-6 w-6 text-gray-500" />
            <div className="text-center">
              <p className="text-sm text-gray-500">Click to upload {label}</p>
              <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
            </div>
          </label>
        )}
      </div>
    </div>
  );
}