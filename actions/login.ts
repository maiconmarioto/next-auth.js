'use server';

import { signIn } from '@/auth';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/data/tokens';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string,
) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: 'Invalid credentials!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    console.log('entrou no if do two factor');
    if (!code) {
      console.log('entrou no if !code');
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }

    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
    console.log('twoFactorToken', twoFactorToken);

    if (!twoFactorToken || twoFactorToken?.token !== code) {
      console.log('entrou no if !twoFactorToken', twoFactorToken?.token, code);
      return { error: 'Código inválido!' };
    }

    const hasExpired = new Date() > twoFactorToken.expires;

    if (hasExpired) {
      return { error: 'Código expirado!' };
    }

    await db.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id,
    );

    if (existingConfirmation) {
      await db.twoFactorConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    }

    await db.twoFactorConfirmation.create({
      data: {
        userId: existingUser.id,
      },
    });
  }
  console.log(
    'antes do signIn',
    callbackUrl,
    callbackUrl || DEFAULT_LOGIN_REDIRECT,
  );
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Logged in!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas!' };
        case 'Verification':
          return { error: 'Email não verificado!' };
        default:
          return { error: 'Oops, Algo deu errado!' };
      }
    }
    throw error;
  }
};
