/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : [
      "lh3.googleusercontent.com"
    ]
  },
  env : {
    DOMAIN : process.env.DOMAIN,
    RAZORPAY_API_KEY : process.env.RAZORPAY_API_KEY
  }
}

module.exports = nextConfig
