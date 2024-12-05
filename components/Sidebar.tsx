"use client"

import { Bell, Home, Mail, PenSquare, Search, Settings, User } from "lucide-react";
import NavItem from "@/components/NavItem";
import { ThemeToggle } from "@/providers/ThemeProvider";
import { useState } from "react";
import PostModal from "./PostModal";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  return (
    <div className="flex h-screen">
      <nav className="flex flex-col justify-between p-2 md:w-64 w-20 border-r border-gray-200 dark:border-gray-800">
        <div>
          <div className="p-3">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-2 dark:text-white">
            <NavItem icon={Home} label="Home" href="/"/>
            <NavItem icon={Search} label="Explore" />
            <NavItem icon={Bell} label="Notifications" />
            <NavItem icon={Mail} label="Messages" />
            <NavItem icon={User} label="Profile" href="/profile" />
            <NavItem icon={Settings} label="Settings" />
          </div>
          <button 
            onClick={() => setIsPostModalOpen(true)} 
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-colors duration-200">
            <PenSquare className="md:hidden h-7 w-7 mx-auto" />
            <span className="hidden md:inline">Post</span>
          </button>
          <PostModal 
            isOpen={isPostModalOpen}
            onClose={() => setIsPostModalOpen(false)}
          />
        </div>
        <div className="ml-2 mt-2 mb-4 text-black dark:text-white">
          <ThemeToggle />
        </div>
      </nav>
      <main className="flex-1 border-r border-gray-200 dark:border-gray-800">
        {children}
      </main>
      <aside className="hidden lg:block w-96 p-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent outline-none w-full dark:text-white"
            />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">Trending</h2>
        </div>
      </aside>
    </div>
  );
}