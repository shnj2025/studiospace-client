   import dns from "dns";
   dns.setServers(["8.8.8.8", "1.1.1.1"]);
const nextConfig = {
  async rewrites() {
    return [{ source: "/server/:path*", destination: `${process.env.API_URL}/:path*` }];
  },
};
export default nextConfig;
