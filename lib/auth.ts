import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'nova-store-secret-key-change-in-production'
);

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) {
      return false;
    }

    const { payload } = await jwtVerify(token, secret);
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function getAdminUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}