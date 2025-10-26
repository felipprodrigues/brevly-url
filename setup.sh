#!/bin/bash

echo "🚀 Brev.ly - Configuração Completa do Projeto"
echo "=============================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm não está instalado!${NC}"
    echo "Instale com: npm install -g pnpm"
    exit 1
fi

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando!${NC}"
    echo "Por favor, inicie o Docker Desktop e tente novamente."
    exit 1
fi

echo -e "${GREEN}✅ Dependências verificadas${NC}"
echo ""

# Setup do Backend
echo "📦 Configurando Backend..."
cd server

# Copiar .env se não existir
if [ ! -f .env ]; then
    echo "📝 Copiando .env.example para .env no backend..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Configure suas variáveis de ambiente em server/.env${NC}"
fi

# Instalar dependências
echo "📥 Instalando dependências do backend..."
pnpm install

# Iniciar Docker PostgreSQL
echo "🐳 Iniciando PostgreSQL..."
docker-compose up -d postgres

# Aguardar PostgreSQL
echo "⏳ Aguardando PostgreSQL ficar pronto..."
sleep 5

# Executar migrations
echo "🗄️  Aplicando migrations..."
pnpm run db:migrate

echo -e "${GREEN}✅ Backend configurado!${NC}"
echo ""

# Setup do Frontend
echo "📦 Configurando Frontend..."
cd ../web

# Copiar .env se não existir
if [ ! -f .env ]; then
    echo "📝 Copiando .env.example para .env no frontend..."
    cp .env.example .env
fi

# Instalar dependências
echo "📥 Instalando dependências do frontend..."
pnpm install

echo -e "${GREEN}✅ Frontend configurado!${NC}"
echo ""

# Voltar para o root
cd ..

echo ""
echo -e "${GREEN}🎉 Configuração completa!${NC}"
echo ""
echo "Para iniciar o projeto:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd server && pnpm dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd web && pnpm dev"
echo ""
echo "URLs:"
echo "  Backend:     http://localhost:3000"
echo "  API Docs:    http://localhost:3000/docs"
echo "  Frontend:    http://localhost:5173"
echo ""
