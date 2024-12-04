import React, { useState } from 'react';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          body: content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full resize-none bg-transparent border-none outline-none text-black dark:text-white text-sm"
            rows={2}
            maxLength={280}
            disabled={isLoading}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!content.trim() || isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 
                       disabled:cursor-not-allowed text-white px-4 py-1 rounded-full text-sm"
            >
              {isLoading ? 'Sending...' : 'Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}