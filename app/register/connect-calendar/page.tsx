'use client'


import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react'
import MultiStepForm from '../_components/muiltStepForm';


export default  function ConnectCalendar( ) {


  const searchParams = new URLSearchParams(window.location.search);
  const hasAuthError = !!searchParams.get("error");

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
                <Button 
                onClick={() => signIn('google')}
                variant='secondary' 
                className="border border-ignite300  hover:bg-green-500"
                >
                  Conectar
                   <ArrowRight /> 
              </Button>
            </div>
              {hasAuthError && (
                <div>
                  <p>Erro ao se conectar com o google</p>
                </div>
                // <ErrorConnection/>
              )}
            <Button
              className="bg-green-800 text-white hover:bg-green-500"  
              type="submit"
             >
          Próximo Passo
          <ArrowRight />
        </Button>
        </div>
    </div>
  );
}
