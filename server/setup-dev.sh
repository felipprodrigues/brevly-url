#!/bin/bash

echo "🐳 Configurando ambiente de desenvolvimento..."

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Copiando .env.example para .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado! Por favor, configure as variáveis necessárias."
fi

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

# Executar migrations
echo "🗄️  Aplicando migrations do banco de dados..."
pnpm run db:migrate

echo ""
echo "🎉 Ambiente configurado com sucesso!"
echo "📊 Connection string: postgresql://postgres:brevlypass@localhost:5432/brevly"
echo ""
echo "Próximo passo:"
echo "▶️  Inicie o servidor: pnpm dev"
