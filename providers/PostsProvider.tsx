"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@prisma/client';

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}

interface Post {
  id: string;
  body: string;
  createdAt: string;
  user: User;
  likedIds: string[];
  comments: Comment[];
}

interface PostsContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = useCallback((newPost: Post) => {
    setPosts((prev) => [{ ...newPost, comments: [] }, ...prev]);
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}