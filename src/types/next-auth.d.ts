import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: "customer" | "admin";
      provider: "credentials" | "google";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    fullname?: string;
    name?: string | null;
    image?: string | null;
    role?: "customer" | "admin";
    provider?: "credentials" | "google";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: Session["user"];
  }
}

