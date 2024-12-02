import { prisma } from '@/lib/prisma' // Ajuste o caminho do prisma se necessário
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { notFound } from 'next/navigation'
import { ScheduleForm } from './scheduleForm/confirmStep/page'

interface SchedulePageProps {
  params: {
    username: string,
    bio: string,
  }
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany({
    select: { username: true },
  })

  return users.map((user) => ({
    username: user.username,
  }))
}

export const revalidate = 60 * 60 * 24 // Revalida a cada 1 dia

export default async function Schedule({ params }: SchedulePageProps) {
  const { username } = params

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-[53.25rem] py-0 px-4 mt-20 mx-auto mb-4">
      <div className="flex flex-col items-center">
        <Avatar className="w-16 h-16 mt-2">
          <AvatarImage src={user.avatar_url || ''} />
          <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="mt-2 leading-relaxed text-xl">{user.name}</h2>
        <p className="text-gray-200 text-xs">{user.bio || ''}</p>
      </div>
      <ScheduleForm/>
    </div>
  )
}
