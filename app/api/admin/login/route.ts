import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

// Admin credentials (in production, these should be stored more securely)
const ADMIN_USERNAME = 'boubi';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('11160893', 12);

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'nova-store-secret-key-change-in-production'
);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    console.log('Login attempt for user:', username); // Debug log

    // Validate credentials
    if (username !== ADMIN_USERNAME || !bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
      console.log('Invalid credentials provided'); // Debug log
      return NextResponse.json(
        { message: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    console.log('Credentials valid, creating token...'); // Debug log

    // Create JWT token
    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    console.log('Token created, setting cookie...'); // Debug log

    // Create response and set HTTP-only cookie
    const response = NextResponse.json(
      { message: 'Connexion réussie' },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    console.log('Login successful for user:', username); // Debug log
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}