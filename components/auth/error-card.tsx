import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLlabel='Oops! Algo deu errado'
      backButtonHref='/auth/login'
      backButtonLabel='Voltar para o login'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};
