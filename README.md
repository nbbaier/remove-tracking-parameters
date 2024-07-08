# Remove Common URL Tracking Parameters 

This package provides a function to remove tracking parameters from URLs. It supports both predefined tracking parameters and custom parameters specified by the user.

## Usage

```typescript
import { removeTrackingParams } from 'jsr:@nbbaier/remove-tracking-parameters';

const originalUrl = new URL('https://example.com?utm_source=newsletter&utm_medium=email&customParam=123');
const cleanedUrl = removeTrackingParams(originalUrl, ['customParam']);

console.log(cleanedUrl.toString());
// Output: https://example.com