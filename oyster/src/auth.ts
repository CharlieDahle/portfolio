import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!

import { getUserByEmail } from "./utils/database";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        if (typeof credentials.email !== 'string') {
          return null; 
        }

        const user = getUserByEmail(credentials.email)
        if(user) {
          if(user.password === credentials.password) {
            return user;
          }
        }
        return null
      },
    }),
  ],
})