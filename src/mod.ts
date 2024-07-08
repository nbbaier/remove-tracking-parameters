/**
 * This module contains a functio to remove specified tracking parameters from a given URL.
 * @module
 */
import trackingParams from "../src/trackingParams.ts";

/**
 * Removes specified tracking parameters from the given URL.
 * @param url - The URL object to remove tracking parameters from.
 * @param customParams - An optional array of custom tracking parameters to remove.
 * @returns The modified URL object with the tracking parameters removed.
 */
export function removeTrackingParams(
  url: URL,
  customParams: string[] = []
): URL {
  const paramsToRemove = new Set([...customParams, ...trackingParams]);
  const paramsToRemoveRegex = new RegExp(Array.from(paramsToRemove).join("|"));
  const params = new URLSearchParams(url.search.replace(/amp;/g, "&"));

  params.forEach((_, key) => {
    if (paramsToRemoveRegex.test(key)) {
      url.searchParams.delete(key);
    }
  });

  return url;
}
