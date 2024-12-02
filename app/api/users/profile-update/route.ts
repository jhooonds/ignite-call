'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

const updateProfileBodySchema = z.object({
    bio: z.string()
})

export async function PUT(req: NextRequest, res: NextResponse) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json()
  const parsedBody = updateProfileBodySchema.parse(body);
  const bio = parsedBody.bio
  

  await prisma.user.update({
    where: {
        id: session.user.id
    },
    data: {
        bio,
    }
  })
  
  return new NextResponse(null, { status: 204 });
}
