import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, res: NextResponse) {
    
    if(req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }
 
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get('username')  || undefined
    const date = searchParams.get('date')

    if(!date) {
        return NextResponse.json({ message: 'Date not provided.'}, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {
            username,
        }    
    })

    if(!user) {
        return NextResponse.json({ message: 'User does not exist.'}, { status: 400 })
    }

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if(isPastDate) {
        return NextResponse.json({ availability: [] })
    }


   // Time Interval
   const userAvailability =  await prisma.userTimeInterval.findFirst({
    where: {
        user_id: user.id,
        week_day: referenceDate.get('day')
    }
   })

   if(!userAvailability) {
    return NextResponse.json({ availability: [] })
   }

   const { time_start_in_minutes, time_end_in_minutes } = userAvailability

   //De hora em hora
   const startHour = time_start_in_minutes / 60 //10
   const endtHour = time_end_in_minutes / 60  //18

   //[10,11,12,13,14,15,16,17]

   const possibleTimes = Array.from({ length:endtHour - startHour }).map((_,i) => {
    return startHour + i
   })
   

   return NextResponse.json( possibleTimes )
}