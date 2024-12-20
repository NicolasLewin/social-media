"use client"

import { Bell, Home, Mail, PenSquare, Search, User } from "lucide-react";
import NavItem from "@/components/NavItem";
import { ThemeToggle } from "@/providers/ThemeProvider";
import { useState } from "react";
import PostModal from "./PostModal";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const { user } = useCurrentUser();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen">
      <div className="flex-none sticky top-0 h-screen">
        <nav className="flex flex-col justify-between p-2 md:w-64 w-20 h-full border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div>
            <div className="p-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
            <div className="space-y-2 dark:text-white">
              <NavItem icon={Home} label="Home" href="/"/>
              <NavItem icon={Search} label="Explore" />
              <NavItem icon={Bell} label="Notifications" />
              <NavItem icon={Mail} label="Messages" />
              <NavItem icon={User} label="Profile" href={user ? `/user/${user.id}` : '/'} />
            </div>
            <button 
              onClick={() => setIsPostModalOpen(true)} 
              className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 transition-colors duration-200"
            >
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
      </div>
      <main className="flex-1 border-r border-gray-200 dark:border-gray-800">
        {children}
      </main>
    </div>
  );
}