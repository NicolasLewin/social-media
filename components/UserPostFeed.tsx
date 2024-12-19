"use client"

import { useEffect, useState } from 'react';
import { User } from "@prisma/client";

interface Post {
  id: string;
  body: string;
  createdAt: string;
  user: User;
  likedIds: string[];
}

interface UserPostFeedProps {
  userId: string;
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full">
          {post.user.profileImage && (
            <img 
              src={post.user.profileImage} 
              alt={post.user.name || "Profile"} 
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-black dark:text-white font-semibold">{post.user.name}</span>
            <span className="text-gray-500">@{post.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-gray-900 dark:text-white">{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function UserPostFeed({ userId }: UserPostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/user/${userId}/posts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-6 text-gray-500">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center p-6 text-gray-500">
        No posts yet.
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}