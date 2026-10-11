import path from "node:path";
import type { NextConfig } from "next";

// Google Fonts CSS for current Chrome user agents no longer ends font file
// URLs in .woff2, which Next 15's font loader cannot parse. Serve the
// extension-based CSS captured for the same families so the build can
// self-host Noto Sans KR and Noto Serif KR.
process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = path.join(process.cwd(), "src/lib/google-font-mocks.js");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
