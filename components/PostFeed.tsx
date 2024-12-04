import { useEffect } from 'react';
import { usePosts } from '@/providers/PostsProvider';
import PostCard from './PostCard';

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