
import Image from "next/image";
import app_preview from '../../public/app-preview.png'
import ClaimUserNameForm from "./component/claimUserNameForm";


export default function Login() {
    return (
        <div className="flex h-screen items-center gap-20 ml-auto max-w-wImagesLogin">  
            {/* Esquerda*/}
            <div className="max-w-[30rem] py-0 px-10">
                <h1 className="font-bold text-4xl max-sm:text-6xl">Agendamento descomplicado</h1>
                <p className="text-lg mt-4 text-gray-200">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</p>
                
                <ClaimUserNameForm/>

            </div>

             {/* Direita*/}
             <div className="pr-8 max-sm:hidden">
                <Image
                    src={app_preview}
                    height={400}
                    quality={100}
                    priority
                    alt='Calendario que simboliza a aplicaçao em funcionamento'
                 />
             </div>
        </div>
    )
}