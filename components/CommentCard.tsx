import React from 'react';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

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
        <Link href={`/user/${comment.user.id}`} className="relative w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition">
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
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/user/${comment.user.id}`} className="hover:underline">
              <span className="text-black dark:text-white font-semibold">{comment.user.name}</span>
            </Link>
            <Link href={`/user/${comment.user.id}`} className="hover:underline">
              <span className="text-gray-500 text-sm">@{comment.user.username}</span>
            </Link>
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