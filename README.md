# Beautiful Bangladesh 🇧🇩

A modern, interactive web application showcasing the breathtaking destinations, rich cultural heritage, diverse ecosystems, and vibrant festivals of Bangladesh.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=flat-square&logo=framer)

---

## 🌟 Overview

**Beautiful Bangladesh** is built to promote tourism, geography, and cultural discovery across all 8 administrative divisions of Bangladesh. From the world's longest natural sea beach in Cox's Bazar to the mangrove wilderness of the Sundarbans and tea gardens of Sylhet, this platform offers an immersive visual experience for travelers and enthusiasts.

---

## ✨ Features

- 🗺️ **Interactive Division Maps**: Explore Bangladesh division-by-division (Dhaka, Chittagong, Sylhet, Khulna, Rajshahi, Rangpur, Barisal, Mymensingh) with custom GeoJSON boundary rendering.
- 🏖️ **Destination Discovery**: Comprehensive guides for top tourist spots, complete with location highlights, best times to visit, and travel tips.
- 📚 **Travel Guides & itineraries**: Curated articles covering eco-tourism, heritage sites, adventure travel, and budget recommendations.
- 🎉 **Festivals & Cultural Heritage**: Explore seasonal festivals, traditional foods, folk art, and historical monuments.
- 🔍 **Instant Search & Filtering**: Fast client-side search across destinations, categories, and geographic locations.
- ⚡ **Performant & Animated UI**: Built with Next.js App Router, Framer Motion, and GSAP for micro-animations and responsive layouts.
- 📱 **Fully Responsive**: Optimized for desktops, tablets, and mobile screens with dark/light visual elegance.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Geographic Data**: [bangladesh-geojson](https://github.com/ifahimreza/bangladesh-geojson)

---

## 📁 Directory Structure

```text
beautiful-bangladesh/
├── data/                    # JSON data (destinations, divisions, guides, festivals, maps)
├── public/                  # Static assets and images
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── about/           # About page
│   │   ├── categories/      # Category pages
│   │   ├── destinations/    # Destination detail pages
│   │   ├── divisions/       # Division-specific pages
│   │   ├── guides/          # Travel guide articles
│   │   ├── search/          # Search interface
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── destinations/    # Destination cards & filters
│   │   ├── home/            # Hero, map, and section components
│   │   ├── layout/          # Navbar, Footer, and Navigation
│   │   ├── search/          # Search bar & results
│   │   └── ui/              # Reusable UI primitives
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Helper utilities and data loaders
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or later installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/beautiful-bangladesh.git
   cd beautiful-bangladesh
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View in Browser**:
   Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server at `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality and style issues |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

