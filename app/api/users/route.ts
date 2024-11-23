'user server'

import { prisma } from '../../_lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
      const { name, username } = await req.json()

      const  userExists = await prisma.user.findUnique({
        where: {
          username,
        }
      })

      if(userExists) {
        return NextResponse.json({success: false, error: 'username already taken.'}, { status: 500 })
      }

      const user = await prisma.user.create({
        data: { name, username }
      })
      
      const response = NextResponse.json({success: true, user: user })

      response.cookies.set('@ignitecall:userId', user.id, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })
      
      return response
    } catch (error) {
        console.error('Erro ao criar o usuário : ', error)
        return NextResponse.json({ success: false, error: 'Erro ao criar usuário' }, { status: 500 });
    }
}