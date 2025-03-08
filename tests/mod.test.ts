import { removeTrackingParams } from "../src/mod.ts";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

describe("removeTrackingParams", () => {
	it("removes known tracking parameters", () => {
		const url = "https://example.com/?utm_source=test&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("removes custom tracking parameters", () => {
		const url = "https://example.com/?ref=affiliate&content=main";
		const customParams = ["ref"];
		const result = removeTrackingParams(url, customParams);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("keeps non-tracking parameters intact", () => {
		const url = "https://example.com/?utm_source=test&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with multiple tracking parameters", () => {
		const url =
			"https://example.com/?utm_source=test&utm_medium=email&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with no tracking parameters", () => {
		const url = "https://example.com/?content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with ampersand encoded parameters", () => {
		const url = "https://example.com/?utm_source=test&amp;content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("removes known tracking parameters", () => {
		const url = "https://example.com/?utm_source=test&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("removes custom tracking parameters", () => {
		const url = "https://example.com/?ref=affiliate&content=main";
		const customParams = ["ref"];
		const result = removeTrackingParams(url, customParams);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("keeps non-tracking parameters intact", () => {
		const url = "https://example.com/?utm_source=test&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with multiple tracking parameters", () => {
		const url =
			"https://example.com/?utm_source=test&utm_medium=email&content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with no tracking parameters", () => {
		const url = "https://example.com/?content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});

	it("works with ampersand encoded parameters", () => {
		const url = "https://example.com/?utm_source=test&amp;content=main";
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
	});
});
