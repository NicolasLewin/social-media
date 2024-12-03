"use client"

import PostFeed from "@/components/PostFeed";

export default function Home() {

  return (
    <>
      <header className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-600 dark:text-gray-400">Home</h1>
      </header>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <PostFeed />
      </div>
    </>
  );
}
