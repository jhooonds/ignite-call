'use server'

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Importação necessária para manipular cookies

export async function POST(req: NextRequest) {
  const cookiesStore = await cookies(); // Agora você pode usar cookiesStore para setar cookies
  try {
    const { name, username } = await req.json();

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return NextResponse.json({ success: false, error: 'Username already taken.' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, username },
    });

    const response = NextResponse.json({ success: true, user });

    cookiesStore.set('@ignitecall:userId', user.id, {
      maxAge: 60 * 60 * 24 * 7, 
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro ao criar o usuário: ', error);
    return NextResponse.json({ success: false, error: 'Erro ao criar usuário' }, { status: 500 });
  }
}
