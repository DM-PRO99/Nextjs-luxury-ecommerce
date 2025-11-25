"use client";
import { useState } from "react";
import { toast } from "react-toastify";

interface OrderEmailButtonProps {
  email?: string;
  name?: string;
}

export default function OrderEmailButton({
  email = "demo@chronos.com",
  name = "Cliente",
}: OrderEmailButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSendOrderEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          name,
          orderId: "W-00045",
          carrier: "Chronos Logistics",
          trackingUrl: "https://chronos.example/tracking/W-00045",
          eta: "2-3 días hábiles",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Error enviando correo");
      }
      toast.success("Correo de pedido enviado ✉️");
    } catch (err) {
      console.error(err);
      toast.error("No pudimos enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSendOrderEmail}
      disabled={loading}
      className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60"
    >
      {loading ? "Enviando..." : "🚀 Enviar correo de pedido"}
    </button>
  );
}
