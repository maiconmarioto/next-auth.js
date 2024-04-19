import { auth } from '@/auth';
import UserInfo from '@/components/user-info';
import { currentUser } from '@/lib/auth';
import React from 'react';

async function Server() {
  const user = await currentUser();
  return <UserInfo user={user} label='Server component' />;
}

export default Server;
