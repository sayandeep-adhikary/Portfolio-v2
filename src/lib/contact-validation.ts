/** Pure validation for the contact form — kept framework-free so it is unit-testable. */

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({ name, email, message }: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";
  if (!message.trim()) errors.message = "Please enter a message.";
  else if (message.trim().length < 10) errors.message = "Your message is a little short.";
  return errors;
}
