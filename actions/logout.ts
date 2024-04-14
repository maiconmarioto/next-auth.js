import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export const logout = async () => {
  async () => {
    await signOut().then(() => {
      location.reload();
      redirect('/auth/signout');
    });
  };
};
