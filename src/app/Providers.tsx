"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/libs/i18n/config";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        theme="dark"
        toastStyle={{
          background: "#1a1f2d",
          color: "#f5f5f5",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
    </SessionProvider>
  );
}
