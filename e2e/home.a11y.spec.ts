import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Smoke test: the homepage must have no serious/critical WCAG violations.
test("homepage has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );

  expect(
    blocking,
    JSON.stringify(
      blocking.map((v) => v.id),
      null,
      2,
    ),
  ).toEqual([]);
});
