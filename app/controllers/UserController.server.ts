import { findOrCreateUser } from "~/repository/User.server";

export const FindOrCreateUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  return findOrCreateUser({ email, name, password: hash.toString() });
};
