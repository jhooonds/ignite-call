
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const confirmFormSchema = z.object({
  name: z.string().min(3,{ message: 'O nome precisa ter no mínimo 3 cararcteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable()
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const { 
      register,
      handleSubmit,
      formState: { isSubmitting, errors }
   } = useForm<ConfirmFormData>({
      resolver: zodResolver(confirmFormSchema)
   })
   
  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <div className="mx-auto flex max-w-[540px] items-center rounded-md">
      <form className="mx-auto mb-0 mt-6 flex w-full flex-col gap-6 bg-gray800 p-6 rounded-md" onSubmit={handleSubmit(handleConfirmScheduling)}>
        <div className="mb-2 flex items-center gap-4 border-b border-gray500 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray200" />
            <p className="text-sm text-gray100">22 de Setembro de 2022</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray200" />
            <p className="text-sm text-gray100">18:00h</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray100 text-sm">
            Nome Completo
          </label>
          <Input type="text" placeholder="Seu nome" {...register('name')} />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              {/* Adicionar messagem de erros personalizadas */}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray100 text-sm">
            Endereço de E-mail
          </label>
          <Input type="email" placeholder="johndoe@example.com" {...register('email')} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          {/* Adicionar messagem de erros personalizadas */}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray100 text-sm">
            Observações
          </label>
          <Textarea placeholder="Adicione observações" {...register('observations')} />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" className="text-gray100 text-sm">
            Cancelar
          </Button>
          <Button 
              disabled={isSubmitting}
              type="submit" 
              className="bg-ignite500 text-white text-sm">
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
