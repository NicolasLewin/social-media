import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
}

//TODO: remove the optional href later

export default function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const content = (
    <button className="flex w-full items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
      <Icon className="h-6 w-6 text-black dark:text-white" />
      <span className="hidden md:inline text-xl text-black dark:text-white">{label}</span>
    </button>
  );

  if (href) {
    return (
      <Link href={href} className="w-full">
        {content}
      </Link>
    );
  }

  return <div className="w-full">{content}</div>;

}
