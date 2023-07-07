import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      authorize(credentials: any) {
        console.log(credentials)
        return {
          email: credentials?.userOrEmail,
          image: credentials?.password,
          name: credentials?.userOrEmail,
        }
      }
    })
  ],
});
