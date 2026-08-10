import { describe, expect, it } from "vitest";

import { EMAIL_PATTERN, validateContact } from "@/lib/contact-validation";

describe("validateContact", () => {
  const valid = {
    name: "Ada",
    email: "ada@example.com",
    message: "Hello there, this is long enough.",
  };

  it("returns no errors for valid input", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("flags empty required fields", () => {
    const errors = validateContact({ name: "  ", email: "", message: "" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("rejects a malformed email", () => {
    expect(validateContact({ ...valid, email: "not-an-email" }).email).toBeDefined();
  });

  it("rejects a too-short message", () => {
    expect(validateContact({ ...valid, message: "hi" }).message).toBeDefined();
  });

  it("EMAIL_PATTERN accepts and rejects representative addresses", () => {
    expect(EMAIL_PATTERN.test("a@b.co")).toBe(true);
    expect(EMAIL_PATTERN.test("a@b")).toBe(false);
    expect(EMAIL_PATTERN.test("a b@c.com")).toBe(false);
  });
});
