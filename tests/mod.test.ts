import { removeTrackingParams } from "../src/mod.ts";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

describe("removeTrackingParams", () => {
	const trackingNames = [
		"fb_source",
		"ga_campaign",
		"hsa_acc",
		"matomo_campaign",
		"mtm_campaign",
		"pd_rd_w",
		"pf_rd_p",
		"piwik_campaign",
		"pk_campaign",
		"ref_src",
		"sms_source",
		"trk_campaign",
		"tw_source",
		"utm_source",
	];

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

	it("preserves pref_lang while removing utm_source", () => {
		const result = removeTrackingParams(
			"https://example.com/?pref_lang=en&utm_source=newsletter",
		);
		assertEquals(result.href, "https://example.com/?pref_lang=en");
	});

	it("preserves tracking-like substrings inside parameter names", () => {
		const url =
			"https://example.com/?manga_id=42&apk_version=3&allow_sms_notifications=1";
		assertEquals(removeTrackingParams(url).href, url);
	});

	it("removes each built-in tracking prefix", () => {
		for (const name of trackingNames) {
			const url = `https://example.com/?${name}=test&content=main`;
			assertEquals(
				removeTrackingParams(url).href,
				"https://example.com/?content=main",
				name,
			);
		}
	});

	it("preserves each built-in tracking prefix embedded inside a key", () => {
		for (const name of trackingNames) {
			const url = `https://example.com/?custom_${name}=test`;
			assertEquals(removeTrackingParams(url).href, url, name);
		}
	});

	it("allows custom regexes to match inside parameter names", () => {
		const url = "https://example.com/?custom_campaign=test&content=main";
		assertEquals(
			removeTrackingParams(url, [/campaign/]).href,
			"https://example.com/?content=main",
		);
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

	it("works with URL object input", () => {
		const url = new URL("https://example.com/?utm_source=test&content=main");
		const originalHref = url.href;
		const result = removeTrackingParams(url);
		assertEquals(result.href, "https://example.com/?content=main");
		// Verify that the original URL object is not mutated
		assertEquals(url.href, originalHref);
	});
});
