import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });

  console.log(response);
};

export default sendEmail;
