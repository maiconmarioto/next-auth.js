'use server';
import { getPasswordResetByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { NewPasswordSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return { error: 'Token não encontrado!' };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Senha inválida!' };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetByToken(token);

  if (!existingToken) {
    return { error: 'Token inválido!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token expirado!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email não encontrado!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Senha redefinida!' };
};
