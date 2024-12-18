import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  bio: string;
  profileImage: string;
  coverImage: string;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    profileImage: '',
    coverImage: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isOpen || !user?.id) return;
      
      try {
        const response = await fetch(`/api/user/current`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const data = await response.json();
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          profileImage: data.profileImage || '',
          coverImage: data.coverImage || ''
        });
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error(error);
      }
    };

    fetchUserData();
  }, [isOpen, user?.id]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/current', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <h2 className="text-xl font-bold text-black dark:text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            disabled={isLoading}
          >
            <X className="h-5 w-5 dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              rows={3}
            />
          </div>

          <ImageUpload
            value={formData.coverImage}
            disabled={isLoading}
            onChange={(value) => setFormData(prev => ({ ...prev, coverImage: value }))}
            label="Cover Image"
          />
          
          <ImageUpload
            value={formData.profileImage}
            disabled={isLoading}
            onChange={(value) => setFormData(prev => ({ ...prev, profileImage: value }))}
            label="Profile Image"
          />

          <div className="flex justify-end pt-4 border-t dark:border-gray-800">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}