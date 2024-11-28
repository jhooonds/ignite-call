'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

const timeIntervalBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
});

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const parsedBody = timeIntervalBodySchema.parse(await req.json());
  const { intervals } = parsedBody;

  const result = await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id!,
        },
      });
    })
  );

  return NextResponse.json({ success: true, data: result, status: 201 });
}