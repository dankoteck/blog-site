import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import type {
  Account,
  DefaultSession,
  NextAuthOptions,
  Profile,
  User,
  Session,
} from "next-auth";
import { getServerSession } from "next-auth";

import DiscordProvider, {
  type DiscordProfile,
} from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type JWT } from "next-auth/jwt";
import { type AdapterUser } from "next-auth/adapters";
import { type NextAuthSessionUser } from "@/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: NextAuthSessionUser;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

type CallbackParams = {
  user: User | null;
  account: Account | null;
  email?: { verificationRequest?: boolean };
  profile?: Profile | undefined;
};

type JWTCallbackParams = {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "signIn" | "signUp" | "update" | undefined;
  isNewUser?: boolean | undefined;
  session?: Session;
};

type SessionCallbackParams = {
  session: DefaultSession;
  token: JWT;
  user: AdapterUser;
  newSession: DefaultSession;
  trigger: "update";
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt(params: JWTCallbackParams) {
      const { token, account, profile } = params;
      if (account?.provider === "discord" && profile) {
        token.discordProfile = profile;
      }
      return token;
    },

    session: (params: SessionCallbackParams) => {
      const { session, token, user } = params;
      // if (session && session.user && token?.discordProfile) {
      //   session.user = {
      //     ...session.user,
      //     discordProfile: token.discordProfile,
      //   } as User & { discordProfile: DiscordProfile };
      // }
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },

    async signIn(params: CallbackParams) {
      const { user, account } = params;
      if (account?.provider === "discord") {
        const response = await fetch(`https://discord.com/api/users/@me`, {
          headers: {
            Authorization: `Bearer ${account.access_token as string}`,
          },
        });
        const data = (await response.json()) as DiscordProfile;

        if (user) {
          user.name = `${data.username}#${data.discriminator}`;
          user.image = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
        }
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
