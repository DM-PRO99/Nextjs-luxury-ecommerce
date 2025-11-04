"use client";
import { useState } from "react";

export default function OrderEmailButton() {
  const [loading, setLoading] = useState(false);

  const handleSendOrderEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "david.henao@riwi.io",
          name: "David",
          orderId: "1",
          carrier: "Daniel Quintero rapi",
          trackingUrl: "https://youtu.be/xvFZjo5PgG0?si=4s5Z4mlD1sZQpE78",
          eta: "2-3 días hábiles",
        }),
      });

      const data = await res.json();
      alert(data.success ? "✅ Correo de pedido enviado" : `❌ Error: ${data.error}`);
    } catch {
      alert("❌ Error al enviar el correo de pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSendOrderEmail}
      disabled={loading}
      className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
    >
      {loading ? "Enviando..." : "🚀 Enviar correo de pedido"}
    </button>
  );
}