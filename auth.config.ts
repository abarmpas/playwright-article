import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnIssues = nextUrl.pathname.startsWith('/issues');
      const isOnHome = nextUrl.pathname === '/home';
      const isOnUsers = nextUrl.pathname === '/users';
      if (isOnIssues) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect authenticated users to login page
      } else if (isOnUsers) {
        if (isLoggedIn) return true;
        return false; // Redirect authenticated users to login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;