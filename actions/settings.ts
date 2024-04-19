'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { currentUser } from '@/lib/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Sem autorização.' };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: 'Sem autorização.' };
  }

  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      console.log('existingUser', existingUser);
      return { error: 'Este email já está em uso.' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(values.email, verificationToken.token);

    return { success: 'Email de verificação enviado!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );
    console.log('passwordMatch', passwordMatch);
    if (!passwordMatch) {
      return { error: 'Senha incorreta.' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id! },
    data: values,
  });

  return { success: 'Configurações atualizadas!' };
};
