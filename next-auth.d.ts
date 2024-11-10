
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
  }

  interface Session extends DefaultSession {
    user: User & {
      id: string;
      name: string;
    };
  }
}
