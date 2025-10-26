#!/bin/bash

echo "🐳 Configurando ambiente de desenvolvimento..."

# Parar e remover containers antigos
echo "📦 Limpando containers antigos..."
docker-compose down -v 2>/dev/null || true

# Subir apenas o PostgreSQL
echo "🚀 Iniciando PostgreSQL..."
docker-compose up -d postgres

# Aguardar PostgreSQL ficar pronto
echo "⏳ Aguardando PostgreSQL ficar pronto..."
sleep 5

# Verificar se está rodando
echo "✅ Verificando status..."
docker-compose ps

echo ""
echo "🎉 PostgreSQL está rodando!"
echo "📊 Connection string: postgresql://postgres:brevlypass@localhost:5432/brevly"
echo ""
echo "Próximos passos:"
echo "1. Execute as migrations: pnpm drizzle-kit push"
echo "2. Inicie o servidor: pnpm dev"
