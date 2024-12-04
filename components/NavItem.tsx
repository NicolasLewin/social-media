import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
}

export default function NavItem({ icon: Icon, label, href = "" }: NavItemProps) {
  const Component = href ? Link : "div";
  return (
    <Component href={href} className="w-full">
      <button className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <Icon className="h-6 w-6 text-black dark:text-white" />
        <span className="hidden md:inline text-xl text-black dark:text-white">{label}</span>
      </button>
    </Component>
  );
};
