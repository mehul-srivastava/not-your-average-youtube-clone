import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, account }) {
      if (account) token.user_id = account.providerAccountId;
      return Promise.resolve(token);
    },
    session({ session, token }) {
      session.user.id = token?.user_id as string;
      return Promise.resolve(session);
    },
  },
});
