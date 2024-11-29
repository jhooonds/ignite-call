'use client'

import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MultiStepForm from "../_components/muiltStepForm";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const updateProfileSchema = z.object({})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default  function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { data: session } = useSession()
  console.log(session)
 
  async function handleUpdateProfile(data: UpdateProfileFormData) {}

  return (
    <div className="max-w-[35.75rem] mt-20 mx-auto mb-1 px-4">
      <div className="px-6">
        <h1 className="leading-relaxed font-bold text-2xl">
            Defina sua disponibilidade
        </h1>
        <p className="text-gray200 mb-6 text-base">
          Por último, uma breve descrição e uma foto de perfil.
        </p>
        <MultiStepForm step={4} />
      </div>

      <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col space-y-6 mt-4 p-4 border border-solid border-gray-800 rounded-md bg-gray-900">
        <div className=" mt-4 flex flex-col gap-2">
            <Label className="flex flex-col gap-4 text-gray100">Foto de perfil</Label>
            <Avatar className="w-16 h-16 mt-2">
                <AvatarImage  src={session?.user?.avatar_url} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
        <div className="flex flex-col gap-4">
            <Label className="flex flex-col gap-4  text-gray100" htmlFor="message">Sobre você</Label>
            <Textarea className="h-32 bg-gray-950 border border-gray-500" id="message"/>
            <p className="text-sm text-gray200">Fale um pouco sobre você. Isto será exibido em sua página pessoal.</p>
        </div>

        <Button
          className="bg-green-800 text-white hover:bg-green-500"
          type="submit"
          disabled={isSubmitting}
        >
          Finalizar
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
