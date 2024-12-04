import { useState } from 'react';
import { User } from "@prisma/client";
import { MessageCircle } from 'lucide-react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';


interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}

interface PostProps {
  id: string;
  body: string;
  createdAt: string;
  user: User;
  likedIds: string[];
  comments: Comment[];
}

export default function PostCard({ post }: { post: PostProps }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${post.id}`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <div className="p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full" />
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
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setIsCommenting(!isCommenting)}
                className="flex items-center gap-1 text-gray-500 hover:text-green-500"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isCommenting && (
        <>
          <CommentForm postId={post.id} onCommentAdded={fetchComments} />
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
}