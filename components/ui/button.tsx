// components/ui/button.tsx
'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        'inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm ' +
        'bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ' +
        className
      }
    >
      {children}
    </button>
  );
}

export default Button;
