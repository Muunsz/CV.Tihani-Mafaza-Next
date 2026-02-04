'use server';

import { signOut as nextAuthSignOut } from '@/app/api/guest/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  try {
    console.log('[LOGOUT_ACTION] Starting server-side logout');
    
    await nextAuthSignOut({
      redirect: false,
    });
    
    console.log('[LOGOUT_ACTION] Logout completed successfully');
  } catch (error) {
    console.error('[LOGOUT_ACTION] Error during logout:', error);
    // Continue to redirect even if error
  }
  
  // Redirect to home
  redirect('/');
}
