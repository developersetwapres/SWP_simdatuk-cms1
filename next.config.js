const path = require("path");
const Dotenv = require("dotenv-webpack");
const alias = {
  "@/components": path.join(__dirname, "components"),
  "@/containers": path.join(__dirname, "containers"),
  "@/hooks": path.join(__dirname, "hooks"),
  "@/props": path.join(__dirname, "props"),
  "@/utils": path.join(__dirname, "utils"),
  "@/store": path.join(__dirname, "store"),
};

const ContentSecurityPolicy = `
  default-src 'self' https://simdatuk-api.ekuator.id/;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  connect-src 'self' https://simdatuk-api.ekuator.id/;
  script-src 'self' 'unsafe-eval' https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' https://simdatuk-api.ekuator.id/ data:;
  object-src 'none';
`;

const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Cache-Control",
    value: "no-store, no-cache, must-revalidate",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env.local"),
        systemvars: true,
      }),
    ];
    config.resolve.alias = Object.assign({}, config.resolve.alias, alias);

    return config;
  },
};

module.exports = nextConfig;
