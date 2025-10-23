import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // Check if API key exists (required)
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Missing environment variable: RESEND_API_KEY. Add it in Vercel Settings → Environment Variables." },
        { status: 500 }
      );
    }

    // 1. OPTIONAL: Try to add contact to Resend audience
    // If API key is restricted or audience doesn't exist, we'll skip this step
    if (audienceId) {
      try {
        const addContactResponse = await fetch(
          `https://api.resend.com/audiences/${audienceId}/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              email: email,
              unsubscribed: false,
              first_name: email.split('@')[0],
            }),
          }
        );

        if (addContactResponse.ok || addContactResponse.status === 409) {
          console.log("✅ Contact saved to audience:", email);
        } else {
          const errorText = await addContactResponse.text();
          console.warn("⚠️ Could not save contact to audience (continuing anyway):", {
            status: addContactResponse.status,
            error: errorText
          });
        }
      } catch (audienceError) {
        console.warn("⚠️ Audience save failed (continuing anyway):", audienceError);
      }
    } else {
      console.log("ℹ️ No audience ID configured, skipping contact save");
    }

    // 2. OPTIONAL: Try to send confirmation email to user
    // With restricted API keys, this will fail for non-account emails
    // We'll skip this and just notify the admin instead
    console.log("ℹ️ Skipping user confirmation email (restricted API key)");

    // 3. Send notification email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "RevExOS Waitlist <onboarding@resend.dev>",
        to: ["contact@revexos.com"],
        subject: "🔔 New Waitlist Signup - RevExOS",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333ea;">New Waitlist Signup</h2>
            <p>Someone just joined the RevExOS waitlist!</p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0;"><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              <strong>Action needed:</strong> Send a personal welcome email to this person from your email client.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
              Note: Automatic confirmation emails are disabled (restricted API key). Once you verify your domain and upgrade your Resend API key, confirmation emails will be sent automatically.
            </p>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text();
      console.error("Failed to send admin email:", {
        status: adminEmailResponse.status,
        error: errorText
      });

      let errorMessage = "Failed to send admin notification.";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Not JSON
      }

      return NextResponse.json(
        { error: `Admin email failed: ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log("✅ Admin notification sent to: contact@cloudifybiz.com");

    return NextResponse.json(
      { message: "Successfully joined waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
