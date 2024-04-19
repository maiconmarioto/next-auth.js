'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import React, { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '@/components/form-sucess';
import { FormError } from '@/components/form-error';

function NewVerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Token não encontrado');
      return;
    }

    console.log(token);
    newVerification(token)
      .then(data => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(err => {
        setError('Oops, algo deu errado');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLlabel='Confirmando seu email'
      backButtonHref='/auth/login'
      backButtonLabel='Voltar para o login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader color='#2563EB' />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
