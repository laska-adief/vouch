# Vouch

> Discover, review, and vouch for movies and TV shows through authentic social recommendations.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)]()
[![Website](https://img.shields.io/badge/Website-vouch.web.id-success.svg)](https://vouch.web.id/)

**🚀 Live Demo:** [https://vouch.web.id/](https://vouch.web.id/)

## 📌 The Problem
When looking for a new movie or TV show, algorithmic recommendations often fall flat, and generic IMDb scores lack personal context. People want to know what their trusted friends and community think, not just what a black-box algorithm suggests.

## 💡 The Solution
Vouch is a social platform where users explicitly "vouch" for their favorite movies and TV shows. By integrating with The Movie Database (TMDb), users can look up media, transparently rate it, write a personal review, and share it on a public timeline to offer human-curated recommendations. 

## ✨ Main Features
- 🎬 **TMDb Integration:** Instantly search and retrieve metadata and posters for any movie or TV show.
- 🔒 **Google Authentication:** Secure and seamless user login powered by Auth.js.
- ⭐ **Personalized Vouching:** Rate media and write detailed reviews to recommend it to the community.
- 🌐 **Public Timeline:** A central feed highlighting all community-vouched media in a modern, responsive interface.

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js
- **UI Library:** React
- **Styling:** Tailwind CSS v4
- **Components:** Shadcn, Radix UI

### Backend
- **Authentication:** NextAuth.js (Auth.js)
- **Database ORM:** Prisma
- **Database:** PostgreSQL

### Tools
- **Language:** TypeScript
- **Linting:** ESLint

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- A running PostgreSQL instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/vouch.git
   cd vouch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory and add the following variables (see `.env.example`):

| Variable Name | Description | Example / Setup |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for Prisma | `postgresql://postgres:password@localhost:5432/vouch` |
| `POSTGRES_USER` | PostgreSQL Username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL Password | `password` |
| `POSTGRES_DB` | PostgreSQL Database name | `vouch` |
| `AUTH_SECRET` | Secret used to encrypt NextAuth.js session data | *Run `npx auth secret` to generate* |
| `AUTH_GOOGLE_ID` | Your Google OAuth Client ID | *Get from Google Cloud Console* |
| `AUTH_GOOGLE_SECRET` | Your Google OAuth Client Secret | *Get from Google Cloud Console* |
| `TMDB_API_KEY` | Your TMDb API Key for fetching movies | *Get from [The Movie Database](https://www.themoviedb.org/)* |

## 💻 Usage

### Local Development

To run the app locally in development mode without Docker:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can then log in with Google, search for a movie via the "Add Recommendation" flow, and post a vouch!

### Docker Compose Setup

To easily spin up the application and database together using Docker Compose:

1. Ensure your `.env` is fully populated.
2. Run the deployment:
   ```bash
   docker compose up -d
   ```

The app will be built and your Postgres DB automatically provisioned. Make sure your `DATABASE_URL` in `.env` relies on the host network (e.g., `db` as host if used internally, or verify the connection string). The app will be available at [http://localhost:3000](http://localhost:3000).

To stop the deployment, run:
```bash
docker compose down
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
