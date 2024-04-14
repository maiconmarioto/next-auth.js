import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Por favor, insira um email válido.',
  }),
  password: z.string().min(1, {
    message: 'Por favor, insira sua senha.',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Por favor, insira um email válido.',
  }),
  password: z.string().min(6, {
    message: 'Sua senha deve ter no mínimo 6 caracteres.',
  }),
  name: z.string().min(1, {
    message: 'Por favor, insira seu nome.',
  }),
});
