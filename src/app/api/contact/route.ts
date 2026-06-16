import { NextResponse } from "next/server";
import { getResend } from "@/lib/email";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
  projectLink?: string;
  company?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ message: "Thanks. We will follow up soon." });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const inquiryType = clean(payload.inquiryType);
  const message = clean(payload.message);
  const projectLink = clean(payload.projectLink);

  if (!name || !email || !inquiryType || !message) {
    return NextResponse.json(
      { message: "Please complete name, email, inquiry type, and message." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (projectLink) {
    try {
      new URL(projectLink);
    } catch {
      return NextResponse.json(
        { message: "Please enter a valid project/file link or leave it blank." },
        { status: 400 },
      );
    }
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    return NextResponse.json(
      { message: "Email is not configured yet. Please email JRW Creative Group directly." },
      { status: 503 },
    );
  }

  try {
    const { error } = await getResend().emails.send({
      to,
      from,
      replyTo: email,
      subject: `JRW Creative Group inquiry: ${inquiryType}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "Phone: Not provided",
        `Inquiry type: ${inquiryType}`,
        projectLink ? `Project/file link: ${projectLink}` : "Project/file link: Not provided",
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Thanks. We will follow up soon." });
  } catch {
    return NextResponse.json(
      { message: "The email provider could not send this yet. Please try again later." },
      { status: 502 },
    );
  }
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 4000) : "";
}
