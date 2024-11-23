'use client'

import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Correção no import
import { api } from "../_lib/axios";
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultiStepForm from "./_components/muiltStepForm";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisa ter pelo menos 3 letras" })
    .regex(/^([a-z\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hifens",
    })
    .transform((username) => username.toLowerCase()),

  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 letras" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const router = useRouter()

  const searchParams = useSearchParams(); 

  useEffect(() => {
    const username = searchParams.get("username");
    if (username) {
      setValue("username", username); 
    }
  }, [searchParams, setValue]);

  async function handleRegister(data: RegisterFormData) {
   try {
     await api.post('/users', {
        name: data.name,
        username: data.username
     })
     router.push('/register/connect-calendar')
   } catch (error) {
    if(error instanceof AxiosError && error?.response?.data?.message) {
      alert(error.response.data.message)
      return
    }
    console.log(error)
   }
  }

  return (
    <div className="max-w-[35.75rem] mt-20 mx-auto mb-1 px-4">
      <div className="px-6">
        <h1 className="leading-relaxed font-bold text-2xl">
          Bem-vindo ao Ignite Call!
        </h1>
        <p className="text-gray200 mb-6 text-base">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
        <MultiStepForm step={1} />
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col space-y-6 mt-4 p-4 border border-solid border-gray-900 rounded-md bg-gray-950"
      >
        <div>
          <Label>Nome de usuário</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray400">
              ignite-call/
            </span>
            <Input
              {...register("username")}
              className="pl-[100px] bg-gray-900  text-white focus:outline-none focus-visible:ring-green-500 placeholder:text-base placeholder:text-white"
              placeholder="seu-usuário"
            />
          </div>
          <span
            className={`text-errorMessage text-sm ${
              errors.username?.message ? "visible" : "invisible"
            }`}
          >
            {errors.username?.message || "Placeholder"}
          </span>
        </div>

        <div>
          <Label>Nome Completo</Label>
          <Input
            {...register("name")}
            className="bg-gray-900 text-white focus:outline-none focus-visible:ring-green-500 placeholder:text-base placeholder:text-white"
            placeholder="Seu nome completo"
          />
          {errors.name?.message && (
            <span className="text-errorMessage text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <Button
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit"
          disabled={isSubmitting}
        >
          Reservar
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
