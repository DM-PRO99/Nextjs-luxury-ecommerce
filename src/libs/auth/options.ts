import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    id: "credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        throw new Error("Missing credentials");
      }

      await connectDB();
      const userFound = await User.findOne({
        email: credentials.email.toLowerCase(),
      }).select("+password");

      if (!userFound) throw new Error("Invalid credentials");

      const passwordMatch = await bcrypt.compare(
        credentials.password,
        userFound.password
      );

      if (!passwordMatch) throw new Error("Invalid credentials");

      return {
        id: userFound._id.toString(),
        email: userFound.email,
        fullname: userFound.fullname,
        role: userFound.role,
        provider: userFound.provider,
        image: userFound.image,
      };
    },
  }) as any,
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }) as any
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email) return false;

      await connectDB();
      const normalizedEmail = user.email.toLowerCase();
      let dbUser = await User.findOne({ email: normalizedEmail });

      if (!dbUser) {
        const randomPassword = await bcrypt.hash(
          randomBytes(32).toString("hex"),
          12
        );

        dbUser = await User.create({
          email: normalizedEmail,
          fullname: user.name || "Google User",
          password: randomPassword,
          provider: "google",
          image: user.image,
        });
      } else if (!dbUser.image && user.image) {
        dbUser.image = user.image;
        await dbUser.save();
      }

      user.id = dbUser._id.toString();
      (user as any).fullname = dbUser.fullname;
      (user as any).role = dbUser.role;
      (user as any).provider = dbUser.provider;
      (user as any).image = dbUser.image;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id:
            (user as any)._id?.toString() ??
            (user as any).id ??
            token.user?.id,
          email: user.email,
          name: (user as any).fullname ?? user.name ?? token.user?.name,
          image: (user as any).image ?? user.image ?? token.user?.image,
          role: (user as any).role ?? token.user?.role ?? "customer",
          provider:
            (user as any).provider ?? token.user?.provider ?? "credentials",
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user && session.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
};

