import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
}

export default function NavItem({ icon: Icon, label }: NavItemProps) {
  return (
    <button className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
      <Icon className="h-6 w-6" />
      <span className="hidden md:inline text-xl">{label}</span>
    </button>
  );
};
