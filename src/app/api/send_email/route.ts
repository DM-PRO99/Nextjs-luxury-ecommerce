import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { object, string, ValidationError } from "yup";

const sendEmailSchema = object({
  to: string().email("Correo inválido").required("El destinatario es obligatorio"),
  name: string().required("El nombre es obligatorio"),
  orderId: string().required("El número de orden es obligatorio"),
  carrier: string().required("La transportadora es obligatoria"),
  trackingUrl: string().url("La URL de rastreo es inválida").required(),
  eta: string().required("La fecha estimada es obligatoria"),
});

export async function POST(req: Request) {
  try {
    const payload = await sendEmailSchema.validate(await req.json(), {
      abortEarly: false,
    });

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
    <h1 style="font-size: 26px; font-weight: 700; color: #1e90ff; margin-bottom: 8px;">Hola, ${payload.name} 👋</h1>
    <p style="font-size: 15px; color:#aaa;">Seguimiento de tu orden <strong>#${payload.orderId}</strong></p>
  </div>
  
  <div style="background: linear-gradient(145deg, #10182a, #0d1220); border-radius: 14px; padding: 24px; border: 1px solid #1e90ff22;">
    <p style="font-size:16px; line-height:1.6;">
      Tu pedido ha sido entregado a la transportadora <strong>${payload.carrier}</strong>.
      <br><br>
      Fecha estimada de entrega: <strong>${payload.eta}</strong>
    </p>

    <div style="margin-top:20px; background:#1a2238; border-radius:10px; padding:15px; border:1px solid #1e90ff22;">
      <p style="font-size:15px; color:#b0b0b0; margin:0;">💡 <strong>Rastrea tu envío:</strong> <a href="${payload.trackingUrl}" style="color:#1e90ff;">${payload.trackingUrl}</a></p>
    </div>
  </div>
  
  <div style="margin-top:35px; text-align:center; font-size:13px; color:#777;">
    <p>Enviado automáticamente desde el panel de <strong>Chronos</strong> 🚀</p>
    <hr style="border:none; border-top:1px solid #222; margin:15px 0;">
    <p style="font-size:12px; color:#555;">No respondas a este mensaje. Generado por Next.js + Nodemailer ⚙️</p>
  </div>

</div>

    `;

    await transporter.sendMail({
      from: `"RGB ZONE" <${process.env.EMAIL_USER}>`,
      to: payload.to,
      subject: "🚚 Tu pedido está en camino",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    const error = err as Error;
    console.error("❌ Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}