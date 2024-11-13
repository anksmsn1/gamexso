// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db'; // Adjust path based on your directory
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

 

// Define the extended user type
interface ExtendedUser {
  id: string | null;
  type: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}
  
const handler = NextAuth({
  
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
        
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        
          
          const user = await db.select().from(users).where(eq(users.email, email)).execute();
          if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return null; // Invalid credentials
          } else {
            return {
              id: user[0].id.toString(),
              name: user[0].name,
              email: user[0].email,
           
            };
          }
        
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    //secret:SECRET_KEY,
    secret: process.env.NEXTAUTH_SECRET, 
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if the user exists and is of the correct type
      if (user) {
        const extendedUser = user as ExtendedUser; // Cast the user to the extended type
        token.id = extendedUser.id;
      
        token.name = extendedUser.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // Add the type to the session
        
      }
      return session;
    },
  },
  pages: {
    signIn: '/adminlogin/',    
  },
});

// You need to export handler as GET and POST since this is now a Route Handler in the app directory
export { handler as GET, handler as POST };
