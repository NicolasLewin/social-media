import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prismadb';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params } : { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        email: true,
        image: true,
        coverImage: true,
        profileImage: true,
        createdAt: true,
        followingIds: true
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, bio, profileImage, coverImage } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        name,
        bio,
        profileImage,
        coverImage
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
