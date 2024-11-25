
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const claimUserNameFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode te apenas letras  e hifens' })
    .transform(username => username.toLocaleLowerCase()),
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export default function ClaimUserNameForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema)
  })


  const router = useRouter()

  async function handleClaimUserName(data: ClaimUserNameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleClaimUserName)} className="grid grid-cols-[1fr_auto] gap-2 mt-4 p-4 border border-solid border-gray-600 rounded-md bg-gray800">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">ignite-call/</span>
          <Input
            {...register('username')}
            className="pl-[100px] bg-gray900 text-gray-500 focus:outline-none focus-visible:ring-green-500"
            placeholder="seu-usuário"
          />
        </div>
        <Button
          disabled={isSubmitting}
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit">
          Reservar
          <ArrowRight />
        </Button>

      </form>
      <div className="mt-2 text-gray-400">
        <p className="text-sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'
          }
        </p>
      </div>
    </>
  );
}
