"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, Mail, ShoppingBag } from "lucide-react";

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="animate-pulse luxury-card p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-platinum/10" />
          <div className="flex-1">
            <div className="h-4 w-40 bg-platinum/10 rounded mb-2" />
            <div className="h-3 w-64 bg-platinum/10 rounded" />
          </div>
        </div>
        <div className="mt-6 h-28 rounded bg-platinum/10" />
        <div className="mt-6 h-10 w-28 rounded bg-platinum/10" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <ProfileSkeleton />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="w-full max-w-lg luxury-card p-8 text-center">
          <User className="w-16 h-16 mx-auto text-platinum/20 mb-4" />
          <h1 className="text-2xl font-serif font-semibold">Not Signed In</h1>
          <p className="text-platinum/60 mt-2">
            Please sign in to view your profile.
          </p>
          <Link href="/login">
            <Button className="mt-6">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-4">
      <div className="luxury-container max-w-4xl">
        <Link href="/store" className="inline-flex items-center text-platinum/60 hover:text-champagne transition-colors mb-8">
          ← Back to Store
        </Link>

        <div className="luxury-card p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="relative h-24 w-24 shrink-0">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User avatar"}
                  fill
                  className="rounded-full object-cover ring-2 ring-champagne/20"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gradient-to-br from-champagne/20 to-champagne/5 grid place-content-center text-2xl font-serif font-semibold text-champagne">
                  {(user?.name || user?.email || "U").slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-bold">
                My Profile
              </h1>
              <p className="text-platinum/60 mt-2">
                Welcome back{user?.name ? `, ${user.name}` : ""}.
              </p>
            </div>
          </div>

          <div className="luxury-divider mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {user?.name && (
              <div className="bg-platinum/5 rounded-lg p-4 border border-platinum/10">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-champagne" />
                  <p className="text-xs uppercase tracking-wide text-platinum/60">
                    Full Name
                  </p>
                </div>
                <p className="font-medium text-lg">{user.name}</p>
              </div>
            )}
            {user?.email && (
              <div className="bg-platinum/5 rounded-lg p-4 border border-platinum/10">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-champagne" />
                  <p className="text-xs uppercase tracking-wide text-platinum/60">
                    Email Address
                  </p>
                </div>
                <p className="font-medium text-lg">{user.email}</p>
              </div>
            )}
          </div>

          <div className="bg-platinum/5 rounded-lg p-6 border border-platinum/10 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-champagne" />
              <h3 className="font-serif font-semibold text-lg">Order History</h3>
            </div>
            <p className="text-platinum/60 text-sm">
              Your order history will appear here once you make your first purchase.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => signOut({ callbackUrl: "/store" })}
              variant="outline"
              size="lg"
            >
              Sign Out
            </Button>
            <Link href="/store">
              <Button variant="ghost" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}