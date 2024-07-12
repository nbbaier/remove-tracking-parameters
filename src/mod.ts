import trackingParams from "./trackingParams.ts";
import { decode } from "npm:entities@5.0.0";

/**
 * Removes specified tracking parameters from the given URL.
 * @param url - The URL object to remove tracking parameters from.
 * @param customParams - An optional array of custom tracking parameters to remove.
 * @returns The modified URL object with the tracking parameters removed.
 */
export function removeTrackingParams(
  urlToClean: string,
  customParams: string[] = []
): URL {
  const url = new URL(decode(urlToClean));
  const paramsToRemove = new Set([...customParams, ...trackingParams]);
  const params = url.searchParams;

  Array.from(params.keys()).forEach((key) => {
    for (const trackingParam of paramsToRemove) {
      if (new RegExp(trackingParam).test(key)) {
        url.searchParams.delete(key);
      }
    }
  });

  return url;
}
