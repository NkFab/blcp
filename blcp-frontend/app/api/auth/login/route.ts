import { NextRequest, NextResponse } from 'next/server';
import { backendUrl, mapBackendUser, setAuthCookies } from '@/lib/backend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const loginResponse = await fetch(backendUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      return NextResponse.json(
        { success: false, error: loginData.error || 'Login failed' },
        { status: loginResponse.status }
      );
    }

    await setAuthCookies(loginData);

    const userResponse = await fetch(backendUrl('/auth/current-user'), {
      headers: {
        Authorization: `Bearer ${loginData.accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Unable to load user profile after login' },
        { status: 502 }
      );
    }

    const backendUser = await userResponse.json();

    return NextResponse.json({
      success: true,
      user: mapBackendUser(backendUser),
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
