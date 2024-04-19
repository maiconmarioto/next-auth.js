import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token} `;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirme seu e-mail',
    html:
      '<p>Clique <a href="' +
      confirmLink +
      '">aqui</a> para confirmar seu e-mail.</p>',
  });
};

export const sendPasswordResteEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token} `;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Redefinir senha',
    html:
      '<p>Clique <a href="' + resetLink + '">aqui</a> redefinir sua senha.</p>',
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Autenticação de dois fatores',
    html: `<p>Seu código de autenticação de dois fatores: ${token}</p>`,
  });
};
