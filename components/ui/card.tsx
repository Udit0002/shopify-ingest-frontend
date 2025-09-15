// components/ui/card.tsx
import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={'bg-white rounded-2xl shadow-sm overflow-hidden ' + className}>{children}</div>;
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={'p-4 ' + className}>{children}</div>;
}

export default Card;
