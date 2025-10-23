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

    // Check if environment variables are configured
    if (!apiKey || !audienceId) {
      const missing = [];
      if (!apiKey) missing.push("RESEND_API_KEY");
      if (!audienceId) missing.push("RESEND_AUDIENCE_ID");

      console.error("Missing environment variables:", {
        hasApiKey: !!apiKey,
        hasAudienceId: !!audienceId,
        missing
      });

      return NextResponse.json(
        { error: `Missing environment variables: ${missing.join(", ")}. Add them in Vercel Settings → Environment Variables.` },
        { status: 500 }
      );
    }

    // 1. Add contact to Resend audience
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
          first_name: email.split('@')[0], // Use email prefix as name
        }),
      }
    );

    // Handle duplicate contacts gracefully (409 means already exists)
    if (!addContactResponse.ok && addContactResponse.status !== 409) {
      const errorText = await addContactResponse.text();
      console.error("Failed to add contact:", {
        status: addContactResponse.status,
        error: errorText,
        audienceId: audienceId
      });

      let errorMessage = "Failed to save contact to audience.";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Error text is not JSON, use default message
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // 2. Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "RevExOS <noreply@mail.revexos.com>",
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
      console.error(
        "Failed to send user email:",
        await userEmailResponse.text()
      );
    }

    // 3. Send notification email to admin
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "RevExOS Waitlist <waitlist@mail.revexos.com>",
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
      console.error(
        "Failed to send admin email:",
        await adminEmailResponse.text()
      );
    }

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
