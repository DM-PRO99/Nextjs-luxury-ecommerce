import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, name, orderId, carrier, trackingUrl, eta } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <div style="background: #0a0f1e; color: #e4e4e4; font-family: 'Inter', 'Segoe UI', sans-serif; padding: 40px; border-radius: 18px; border: 1px solid #1e90ff44; max-width: 640px; margin: auto; box-shadow: 0 0 25px #0005;">
  
  <div style="text-align:center; margin-bottom: 30px;">
    <h1 style="font-size: 26px; font-weight: 700; color: #1e90ff; margin-bottom: 8px;">Hola, David Henao 👋</h1>
    <p style="font-size: 15px; color:#aaa;">Este es un mensaje enviado desde <strong>Next.js</strong></p>
  </div>
  
  <div style="background: linear-gradient(145deg, #10182a, #0d1220); border-radius: 14px; padding: 24px; border: 1px solid #1e90ff22;">
    <p style="font-size:16px; line-height:1.6;">
      ¡Saludos cordiales! Soy <strong>Diego Alejandro Mena Ciceri</strong>, desarrollador de la plataforma.  
      <br><br>
      Te envío este mensaje para confirmarte que la integración de <strong>Next.js</strong> está funcionando correctamente ⚡.
    </p>

    <div style="margin-top:20px; background:#1a2238; border-radius:10px; padding:15px; border:1px solid #1e90ff22;">
      <p style="font-size:15px; color:#b0b0b0; margin:0;">💡 <strong>Mensaje técnico:</strong> Este correo se generó dinámicamente desde un servidor con Next.js + Nodemailer.</p>
    </div>
  </div>
  
  <div style="margin-top:35px; text-align:center; font-size:13px; color:#777;">
    <p>Enviado automáticamente desde el panel de <strong>Diego Alejandro Mena Ciceri</strong> 🚀</p>
    <hr style="border:none; border-top:1px solid #222; margin:15px 0;">
    <p style="font-size:12px; color:#555;">No respondas a este mensaje. Generado por Next.js + Nodemailer ⚙️</p>
  </div>

</div>

    `;

    await transporter.sendMail({
      from: `"RGB ZONE" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🚚 Tu pedido está en camino",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}