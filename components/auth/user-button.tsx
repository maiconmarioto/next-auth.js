import LogoutButton from '@/components/auth/logout-button';
import { AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { ExitIcon } from '@radix-ui/react-icons';
import React from 'react';
import { FaUser } from 'react-icons/fa';

function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image || ''}
            className='rounded-full w-10 h-10'
          />
          <AvatarFallback className='bg-sky-500 w-10 h-10'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem>
          <ExitIcon className='h-4 w-4 mr-2' />
          <LogoutButton>Logout</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
