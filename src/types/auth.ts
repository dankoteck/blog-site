import { type DefaultSession } from "next-auth";

export type AvailableAuthProviders =
  | "google"
  | "facebook"
  | "github"
  | "twitter"
  | "discord";

export type NextAuthSessionUser = DefaultSession["user"] & {
  id: string;
  // ...other properties
  // role: UserRole;
};
