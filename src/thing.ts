import trackingParams from "./trackingParams.ts";
const url = new URL(
  "https://example.com/?utm_source=test&utm_medium=email&content=main"
);

// Convert URLSearchParams to an array and filter out 'utm_' parameters
Array.from(url.searchParams.keys()).forEach((key) => {
  for (const trackingParam of trackingParams) {
    if (new RegExp(trackingParam).test(key)) {
      url.searchParams.delete(key);
    }
  }
});

console.log("After:", url.toString());
