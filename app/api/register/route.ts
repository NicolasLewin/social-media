import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, name, password } = body;

    if (!email || !username || !name || !password) {
      return new NextResponse(
        JSON.stringify({ message: 'All fields are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid email format' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return new NextResponse(
        JSON.stringify({ message: 'Username can only contain letters, numbers, and underscores' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return new NextResponse(
        JSON.stringify({ message: `This ${field} is already registered` }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (/[@#$%^&(),.":{}|<>]/.test(password))
      return NextResponse.json({ message: 'Password has an unsupported character' }, { status: 400 })

    if(password.length < 8)
      return NextResponse.json({ message: 'Password must be at least 8 characters' }, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPwd: hashedPassword,
        bio: "",
        followingIds: [],
        hasNotification: false
      }
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}