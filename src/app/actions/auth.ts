'use server';

import { signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  try {
    console.log('[LOGOUT_ACTION] Starting server-side logout');
    
    await signOut({
      redirect: false,
    });
    
    console.log('[LOGOUT_ACTION] Logout completed successfully');
  } catch (error) {
    console.error('[LOGOUT_ACTION] Error during logout:', error);
  } finally {
    // Always redirect to home
    redirect('/');
  }
}
