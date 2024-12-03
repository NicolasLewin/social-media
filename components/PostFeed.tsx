"use client"

import { useEffect } from 'react';
import { User } from "@prisma/client";
import { usePosts } from '@/providers/PostsProvider';

interface Post {
  id: string;
  body: string;
  createdAt: string;
  user: User;
  likedIds: string[];
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className=" text-black dark:text-white font-semibold">{post.user.name}</span>
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

export default function PostFeed() {
  const { posts, setPosts } = usePosts();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [setPosts]);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}