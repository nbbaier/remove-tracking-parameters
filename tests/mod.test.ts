import { removeTrackingParams } from "../src/mod.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("removeTrackingParams removes known tracking parameters", () => {
  const url = "https://example.com/?utm_source=test&content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test("removeTrackingParams removes custom tracking parameters", () => {
  const url = "https://example.com/?ref=affiliate&content=main";
  const customParams = ["ref"];
  const result = removeTrackingParams(url, customParams);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test("removeTrackingParams keeps non-tracking parameters intact", () => {
  const url = "https://example.com/?utm_source=test&content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test(
  "removeTrackingParams works with multiple tracking parameters",
  () => {
    const url =
      "https://example.com/?utm_source=test&utm_medium=email&content=main";
    const result = removeTrackingParams(url);
    assertEquals(result.href, "https://example.com/?content=main");
  }
);

Deno.test("removeTrackingParams works with no tracking parameters", () => {
  const url = "https://example.com/?content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test(
  "removeTrackingParams works with ampersand encoded parameters",
  () => {
    const url = "https://example.com/?utm_source=test&amp;content=main";
    const result = removeTrackingParams(url);
    assertEquals(result.href, "https://example.com/?content=main");
  }
);

Deno.test("removeTrackingParams removes known tracking parameters", () => {
  const url = "https://example.com/?utm_source=test&content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test("removeTrackingParams removes custom tracking parameters", () => {
  const url = "https://example.com/?ref=affiliate&content=main";
  const customParams = ["ref"];
  const result = removeTrackingParams(url, customParams);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test("removeTrackingParams keeps non-tracking parameters intact", () => {
  const url = "https://example.com/?utm_source=test&content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test(
  "removeTrackingParams works with multiple tracking parameters",
  () => {
    const url =
      "https://example.com/?utm_source=test&utm_medium=email&content=main";
    const result = removeTrackingParams(url);
    assertEquals(result.href, "https://example.com/?content=main");
  }
);

Deno.test("removeTrackingParams works with no tracking parameters", () => {
  const url = "https://example.com/?content=main";
  const result = removeTrackingParams(url);
  assertEquals(result.href, "https://example.com/?content=main");
});

Deno.test(
  "removeTrackingParams works with ampersand encoded parameters",
  () => {
    const url = "https://example.com/?utm_source=test&amp;content=main";
    const result = removeTrackingParams(url);
    assertEquals(result.href, "https://example.com/?content=main");
  }
);
