'use client'

import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { signIn, useSession, SessionProvider  } from 'next-auth/react'
import MultiStepForm from '../_components/muiltStepForm';

export default function ConnectCalendar() {
  const session = useSession();

  const searchParams = new URLSearchParams(window.location.search);
  const hasAuthError = !!searchParams.get("error");

  const isSignedIn = session?.status === 'authenticated'

  async function handleConnectionCalendar() {
    await signIn('google')
  }

  return (
    <div className="max-w-[35.75rem] mt-20 mx-auto mb-1 px-4">
      <div className="px-6">
        <h1 className="leading-relaxed font-bold text-2xl">
          Conecte sua agenda!
        </h1>
        <p className="text-gray200 mb-6 text-base">
          Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStepForm step={2} />
      </div>
      <div className="flex flex-col space-y-6 mt-6 p-6 border border-solid border-gray-900 rounded-md bg-gray-950">
        <div className="flex items-center justify-between border border-gray900 bg-gray-900 py-6 px-4 rounded-md mb-2">
          <h2>Google Calendar</h2>
          {
            isSignedIn ? (
              <Button>
                Conectado
                <Check/>
              </Button>
            ) : (
              <Button
                onClick={handleConnectionCalendar}
                variant='secondary'
                className="border border-ignite300  hover:bg-green-500"
              >
                Conectar
                <ArrowRight />
              </Button>
            )
          }
        </div>
        {hasAuthError && (
          <span>
            <p className='text-red-600 text-xs font-semibold'>Falha ao se conectar no Google, verifique se você habilitou as permissões de acesso ao Google Calendar</p>
          </span>
        )}
        <Button
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit"
          disabled={!isSignedIn}
        >
          Próximo Passo
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
