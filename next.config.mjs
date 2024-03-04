/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  basePath: '/.',
  //images: {
    //domains: ['media.licdn.com', 'raw.githubusercontent.com'],
  //},
};

export default nextConfig;
