'use client';
import { logout } from '@/actions/logout';
import { ChildProcess } from 'child_process';
import React from 'react';

interface LogoutButtonProps {
  children: React.ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = async () => {
    logout();
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
}

export default LogoutButton;
