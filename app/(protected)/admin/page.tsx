'use client';
import { admin } from '@/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-sucess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react';
import { toast } from 'sonner';

function AdminPage() {
  const onApiRouteClick = async () => {
    fetch('/api/admin').then(res => {
      if (res.ok) {
        toast.success('Success');
      } else {
        toast.error('FORBIDDEN');
      }
    });
  };

  const onServerActionClick = async () => {
    admin().then(res => {
      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='You are an admin.' />
        </RoleGate>
      </CardContent>
      <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
        <p className='text-sm font-medium'>Admin-only API Route</p>
        <Button onClick={onApiRouteClick}>Click to test</Button>
      </div>

      <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
        <p className='text-sm font-medium'>Admin-only Server action</p>
        <Button onClick={onServerActionClick}>Click to test</Button>
      </div>
    </Card>
  );
}

export default AdminPage;
