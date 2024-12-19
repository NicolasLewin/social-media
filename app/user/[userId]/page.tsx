'use client'

import { useState, useEffect, use } from 'react';
import { Calendar } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import EditProfileModal from '@/components/EditProfileModal';
import UserPostFeed from '@/components/UserPostFeed';
import type { User } from '@prisma/client';

interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = use(params);
  const { user: currentUser } = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-white dark:bg-black border-b dark:border-gray-800">
        <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
          {user.coverImage && (
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="p-4">
          <div className="relative flex justify-between">
            <div className="absolute -top-16">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-black bg-gray-200 dark:bg-gray-800">
                {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt={user.name || "Profile"}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="ml-auto space-x-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 
                           hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Edit profile
                </button>
              ) : currentUser && (
                <button
                  onClick={() => {}}
                  className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black
                           hover:bg-opacity-90 transition"
                >
                  {user.followingIds?.includes(currentUser.id) ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-16 space-y-1">
            <h1 className="text-xl font-bold dark:text-white">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
            {user.bio && <p className="text-gray-900 dark:text-white mt-3">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 text-gray-500 mt-3">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-4 text-gray-500 mt-3">
              <button className="hover:underline">
                <span className="text-black dark:text-white font-bold">
                  {user.followingIds?.length || 0}
                </span>{' '}
                Following
              </button>
              <button className="hover:underline">
                <span className="text-black dark:text-white font-bold">
                  0
                </span>{' '}
                Followers
              </button>
            </div>
          </div>
        </div>

        <div className="flex border-b dark:border-gray-800">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition
                     ${activeTab === 'posts' ? 'border-b-2 border-green-500 font-semibold' : ''}`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('replies')}
            className={`flex-1 py-4 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition
                     ${activeTab === 'replies' ? 'border-b-2 border-green-500 font-semibold' : ''}`}
          >
            Replies
          </button>
        </div>
      </header>

      {/*TODO: display replies from the user*/}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {activeTab === 'posts' && <UserPostFeed userId={userId} />}
        {activeTab === 'replies' && (
          <div className="flex justify-center items-center p-6 text-gray-500">
            To be implemented
          </div>
        )}
      </div>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}