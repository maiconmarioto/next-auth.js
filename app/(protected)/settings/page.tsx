import { navigate } from '@/actions/navigate';
import { auth } from '@/auth';
import { signOut } from '@/auth';
import React from 'react';

async function Settings() {
  const session = await auth();

  if (!session) {
    // Force refresh the page
  }
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut().then(() => {
            location.reload();
            navigate('/auth/signout');
          });
        }}
      >
        <button type='submit'>Sign out</button>
      </form>
    </div>
  );
}

export default Settings;
