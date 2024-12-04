import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { postId, body } = await req.json();

    if (!postId || !body || typeof body !== 'string') {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: user.id,
        postId
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return new NextResponse('Post ID required', { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}