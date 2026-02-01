import { unescape as decodeHtmlEntities } from "@std/html";
import {
	TRACKING_PARAM_REGEX,
	TRACKING_PARAM_STRINGS,
} from "./trackingParams.ts";

/**
 * Removes specified tracking parameters from the given URL.
 * @param urlToClean - The URL string or object to remove tracking parameters from.
 * @param customParams - An optional array of custom tracking parameters to remove.
 * @returns The modified URL object with the tracking parameters removed.
 */
export function removeTrackingParams(
	urlToClean: string | URL,
	customParams: (string | RegExp)[] = [],
): URL {
	let url: URL;
	if (typeof urlToClean === "string") {
		url = new URL(decodeHtmlEntities(urlToClean));
	} else {
		url = new URL(urlToClean);
	}

	const customStrings = new Set<string>();
	const customRegex: RegExp[] = [];

	for (const p of customParams) {
		if (typeof p === "string") {
			customStrings.add(p);
		} else {
			customRegex.push(p);
		}
	}

	const params = Array.from(url.searchParams.keys());

	for (const key of params) {
		if (TRACKING_PARAM_STRINGS.has(key) || customStrings.has(key)) {
			url.searchParams.delete(key);
			continue;
		}

		if (
			TRACKING_PARAM_REGEX.some((r) => r.test(key)) ||
			customRegex.some((r) => r.test(key))
		) {
			url.searchParams.delete(key);
		}
	}

	return url;
}
