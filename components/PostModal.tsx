import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PostModal({isOpen, onClose}: PostModalProps) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if(!isOpen) return null;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          setIsLoading(true);
          
          const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: content })
          });
    
          if (!response.ok) {
            throw new Error('Failed to create post');
          }
    
          toast.success('Post created successfully!');
          setContent('');
          onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create post');
        } finally {
            setIsLoading(false);
        }
      };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-xl">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <h2 className="text-xl font-bold text-black dark:text-white">Create Post</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                disabled={isLoading}
              >
                <X className="h-5 w-5 dark:text-white" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-32 resize-none bg-transparent border-none outline-none text-black dark:text-white"
                  maxLength={280}
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border-t dark:border-gray-800">
                <span className="text-sm text-gray-500">
                  {280 - content.length} characters remaining
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() || isLoading}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 
                           disabled:cursor-not-allowed text-white px-4 py-2 rounded-full"
                >
                  {isLoading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}