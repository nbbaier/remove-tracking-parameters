import { unescape as decodeHtmlEntities } from "@std/html";
import trackingParams from "./trackingParams.ts";

/**
 * Removes specified tracking parameters from the given URL.
 * @param url - The URL object to remove tracking parameters from.
 * @param customParams - An optional array of custom tracking parameters to remove.
 * @returns The modified URL object with the tracking parameters removed.
 */
export function removeTrackingParams(
	urlToClean: string,
	customParams: (string | RegExp)[] = [],
): URL {
	const url = new URL(decodeHtmlEntities(urlToClean));
	const paramsToRemove = new Set([...customParams, ...trackingParams]);
	const params = Array.from(url.searchParams.keys());

	for (const key of params) {
		for (const trackingParam of paramsToRemove) {
			const regex =
				typeof trackingParam === "string"
					? new RegExp(`^${trackingParam}$`)
					: trackingParam;

			if (regex.test(key)) {
				url.searchParams.delete(key);
			}
		}
	}

	return url;
}
