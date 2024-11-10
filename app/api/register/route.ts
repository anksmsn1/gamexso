import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const hashedPassword = await hash(password, 10);
    // await db.insert(users).values({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    return NextResponse.json({ user: null, message: 'Account created.' });
  } catch (error) {
    return NextResponse.json(
      { message:error},
      { status: 500 },
    );
  }
}
