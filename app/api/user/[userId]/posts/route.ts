import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: {
        userId
      },
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