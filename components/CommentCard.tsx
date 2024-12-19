import React from 'react';
import { User } from '@prisma/client';
import Image from 'next/image';

interface CommentProps {
  id: string;
  body: string;
  createdAt: string;
  user: User;
}

export default function CommentCard({ comment }: { comment: CommentProps }) {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 pl-12">
      <div className="flex gap-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          {comment.user.profileImage ? (
            <Image
              src={comment.user.profileImage}
              alt={comment.user.name || "Profile picture"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                {comment.user.name?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-black dark:text-white font-semibold">{comment.user.name}</span>
            <span className="text-gray-500 text-sm">@{comment.user.username}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-gray-900 dark:text-white text-sm">{comment.body}</p>
        </div>
      </div>
    </div>
  );
}