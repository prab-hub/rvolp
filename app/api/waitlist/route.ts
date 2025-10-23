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

    // 2. Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "RevExOS <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to RevExOS Waitlist! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="background: linear-gradient(to right, #9333ea, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; margin: 0;">
                RevExOS
              </h1>
            </div>

            <h2 style="color: #1f2937; margin-bottom: 16px;">You're on the list! 🎉</h2>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thank you for joining the RevExOS waitlist! We're excited to have you as an early user.
            </p>

            <div style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 24px; border-radius: 12px; margin: 24px 0;">
              <p style="color: white; margin: 0; font-size: 16px; line-height: 1.6;">
                <strong>What's next?</strong><br>
                We'll notify you as soon as RevExOS launches. Get ready to revolutionize your agency's revenue and expense tracking!
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Stay tuned for updates,<br>
              <strong>The RevExOS Team</strong>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              You received this email because you signed up for the RevExOS waitlist.
            </p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("Failed to send user email:", {
        status: userEmailResponse.status,
        error: errorText
      });

      let errorMessage = "Failed to send confirmation email.";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Not JSON
      }

      return NextResponse.json(
        { error: `User email failed: ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log("✅ Confirmation email sent to:", email);

    // 3. Send notification email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "RevExOS Waitlist <onboarding@resend.dev>",
        to: ["contact@cloudifybiz.com"],
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
              This contact has been automatically added to your Resend audience.
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
