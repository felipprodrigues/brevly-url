# FTR - Pós-gradução Tech Developer 360º - Brev.ly

URL Shortener application built with Fastify (Backend) and React (Frontend).

## 🚀 Quick Start

### Prerequisites
- [Docker](https://www.docker.com/get-started) installed and running
- [Node.js](https://nodejs.org/) 18+ installed
- [pnpm](https://pnpm.io/) installed (`npm install -g pnpm`)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd brev-ly
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Run setup script (starts Docker PostgreSQL and runs migrations)
chmod +x setup-dev.sh
./setup-dev.sh

# Start the development server
pnpm dev
```

The backend will be running at:
- **API**: http://localhost:3000
- **API Docs**: http://localhost:3000/docs

### 3. Frontend Setup
Open a new terminal:
```bash
cd web

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start the development server
pnpm dev
```

The frontend will be running at: http://localhost:5173

## 📁 Project Structure

```
brev-ly/
├── server/          # Backend (Fastify + PostgreSQL + Drizzle ORM)
├── web/            # Frontend (React + Vite)
└── README.md
```

## 🗄️ Database Management

### Start PostgreSQL
```bash
cd server
docker-compose up -d postgres
```

### Run Migrations
```bash
cd server
pnpm run db:migrate
```

### Access Database
```bash
docker exec -it server-postgres-1 psql -U postgres -d brevly
# Password: brevlypass
```

### Stop Database
```bash
cd server
docker-compose down
```

## 🔧 Environment Variables

### Backend (`server/.env`)
```env
PORT=3000
NODE_ENV=development
HOST=127.0.0.1
DATABASE_URL=postgresql://postgres:brevlypass@localhost:5432/brevly
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET=your_bucket_name
CLOUDFLARE_PUBLIC_URL=your_public_url
```

### Frontend (`web/.env`)
```env
VITE_API_URL=http://localhost:3000/links
```

## 🎯 Features

- ✅ Create shortened URLs
- ✅ Delete URLs
- ✅ List all URLs
- ✅ Track access counts (hits)
- ✅ Export links to CSV
- ✅ CSV storage on Cloudflare R2 (CDN)
- ✅ Redirect to original URL via short URL

## 🛠️ Available Scripts

### Backend
```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests
pnpm db:generate  # Generate new migration
pnpm db:migrate   # Apply migrations
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Drizzle Studio
```

### Frontend
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

## 🐳 Docker

Run the entire stack with Docker:
```bash
cd server
docker-compose up --build
```

This will start:
- PostgreSQL on port 5432
- Backend on port 3000
- Frontend on port 8080

## 🧪 Testing the API

### Create a Link
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://google.com", "shortUrl": "google"}'
```

### List All Links
```bash
curl http://localhost:3000/api/links
```

### Access a Short Link
```bash
curl -L http://localhost:3000/google
```

## 🎨 Design

- Figma: https://www.figma.com/community/file/1477335071553579816/encurtador-de-links

## 📸 Screenshots

![Tela Principal](https://github.com/user-attachments/assets/ed30c74c-1035-4375-8001-2f105061b394)

![Tela de Redirecionamento](https://github.com/user-attachments/assets/ba087a63-b616-4e3a-b8ea-c0c36469a4c1)

![Tela de Link não encontrado](https://github.com/user-attachments/assets/083f2b21-9c33-419a-956c-a9b5fbc5a826)

## 🐛 Troubleshooting

### Port Already in Use
If ports 3000 or 5173 are already in use, you can change them in the respective `.env` files.

### Database Connection Issues
Make sure Docker is running and PostgreSQL container is up:
```bash
docker ps | grep postgres
```

### Migrations Not Applied
Run migrations manually:
```bash
cd server
pnpm run db:migrate
```

## 👤 Author

@felipprodrigues

## 📄 License

ISC
