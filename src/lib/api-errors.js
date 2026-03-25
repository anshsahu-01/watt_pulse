export function getDatabaseErrorMessage(error, fallbackMessage) {
  const message = String(error?.message || "");

  if (
    message.includes("bad auth") ||
    message.includes("Authentication failed") ||
    message.includes("Username and Password not accepted") ||
    message.includes("not authorized")
  ) {
    return "Database authentication failed. Check your MongoDB username and password.";
  }

  if (
    message.includes("whitelist") ||
    message.includes("ENOTFOUND") ||
    message.includes("ECONNREFUSED") ||
    message.includes("querySrv") ||
    message.includes("Server selection timed out")
  ) {
    return "Database connection failed. Check Atlas Network Access and your MongoDB URI.";
  }

  if (error?.code === 11000) {
    return "An account with this email already exists.";
  }

  return fallbackMessage;
}
