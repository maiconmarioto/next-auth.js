import { FormError } from '@/components/form-error';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message='You are not authorized to view this page.' />;
  }

  return <>{children}</>;
}

export default RoleGate;
