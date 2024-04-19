import NavBar from '@/app/(protected)/_components/navbar';
import React from 'react';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400 to-blue-800'>
      <NavBar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
