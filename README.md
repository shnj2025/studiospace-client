# StudioSpace

Peer-to-peer creative workspace & production studio sharing platform.

## Live Links
- **Live site:** https://studiospace-client-delta.vercel.app
- **Live API:** https://studiospace-server-oz4y.onrender.com
- **Client repo:** https://github.com/shnj2025/studiospace-client
- **Server repo:** https://github.com/shnj2025/studiospace-server

## Features
- Home with 3-slide Swiper hero, 6 featured studios from MongoDB, category cards, booking steps and host guarantee
- Explore Studios with search, category filter and sorting
- Studio details with gallery carousel, amenities, host info, reviews and booking modal
- Private CRUD: add, update and delete (with confirmation modal) your own studios
- Bookings with Pending / Confirmed / Completed / Cancelled status and cancel option
- Double-booking prevention on confirmed time slots
- JWT in HTTPOnly cookies protecting server mutations (401 when unauthorized)
- Google login and email/password login with BetterAuth
- Light / dark theme toggle, toast notifications, skeleton loaders, custom 404 page

## Tech Stack
Next.js 14 (App Router), Tailwind CSS + DaisyUI, BetterAuth (MongoDB adapter) + JWT, Sonner, Swiper, Express.js, MongoDB

## Local Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. Start the server repo first (`npm run dev` in the server folder)
4. `npm run dev` and open http://localhost:3000

## Examiner Test Credentials
- Email: abc@gmail.com
- Password: Abc123