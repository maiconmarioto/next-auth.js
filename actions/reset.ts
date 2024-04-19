'use server';
import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResteEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/data/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Email invalido!' };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: 'Email não encontrado!' };
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email,
  );

  await sendPasswordResteEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: 'Email sent!' };
};
