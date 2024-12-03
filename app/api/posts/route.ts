import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
