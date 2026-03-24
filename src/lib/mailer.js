import nodemailer from "nodemailer";

export function getMailCredentials() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Email credentials are not configured.");
  }

  return { user, pass };
}

export function createMailTransport() {
  const { user, pass } = getMailCredentials();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

export function getAdminAddress() {
  const { user } = getMailCredentials();
  return user;
}
