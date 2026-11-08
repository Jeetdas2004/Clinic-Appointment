import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children: ReactNode;
};

const Media = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-3 pt-2">
      {children}
    </div>
  );
};

export default Media;

export const MediaItem = ({
  children,
  href = '#',
  label = 'Social link',
}: {
  children: ReactNode;
  href?: string;
  label?: string;
}) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white text-lg transition-all hover:scale-110 shadow-xs cursor-pointer"
    >
      {children}
    </Link>
  );
};
