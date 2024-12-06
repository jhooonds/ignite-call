import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { username: string } }) {
    const { params } = context;// Extraímos diretamente de params
    const { username } = params

    const { searchParams } = req.nextUrl;
    const date = searchParams.get('date');

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
        return NextResponse.json({ possibleTimes: [], avaibleTimes: [] })
    }


   // Time Interval
   const userAvailability =  await prisma.userTimeInterval.findFirst({
    where: {
        user_id: user.id,
        week_day: referenceDate.get('day')
    }
   })

   if(!userAvailability) {
    return NextResponse.json({ possibleTimes: [], avaibleTimes: [] })
   }

   const { time_start_in_minutes, time_end_in_minutes } = userAvailability

   //De hora em hora
   const startHour = time_start_in_minutes / 60 //10
   const endtHour = time_end_in_minutes / 60  //18

   //[10,11,12,13,14,15,16,17]

   const possibleTimes = Array.from({ length:endtHour - startHour }).map((_,i) => {
    return startHour + i
   })

   //greater than or equal

   const blockedTimes = await prisma.scheduling.findMany({
    select: {
        date: true,
    },
    where: {
        user_id: user.id,
        date: {
            gte: referenceDate.set('hour', startHour).toDate(),
            lte: referenceDate.set('hour', endtHour).toDate()
        },
    }
   })

   const avaibleTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time);
    });
    
   // [8, 9, 10]

   return NextResponse.json({ possibleTimes, avaibleTimes })
}