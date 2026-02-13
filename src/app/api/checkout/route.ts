import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia", // Use latest API version or what was installed
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  let user;

  try {
    user = await auth.verifyIdToken(token);
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const { items } = await req.json(); // Array of { productId, quantity, price, name, image }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in checkout" }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout/result?status=cancel`,
      metadata: {
        userId: user.uid,
      },
      customer_email: user.email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
