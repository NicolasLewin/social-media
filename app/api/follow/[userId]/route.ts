import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prismadb';
import { authOptions } from '@/lib/auth';

//TODO: to modify later

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!currentUser) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const userToFollow = await prisma.user.findUnique({
      where: {
        id: params.userId
      }
    });

    if (!userToFollow) {
      return new NextResponse('User not found', { status: 404 });
    }

    const currentFollowingIds = currentUser.followingIds || [];

    const isFollowing = currentFollowingIds.includes(params.userId);

    const updatedFollowingIds = isFollowing
      ? currentFollowingIds.filter(id => id !== params.userId)
      : [...currentFollowingIds, params.userId];

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}