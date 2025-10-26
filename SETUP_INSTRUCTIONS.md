# 🚀 Instruções de Configuração do Ambiente de Desenvolvimento

## ✅ Status Atual
- ✅ Docker PostgreSQL rodando
- ✅ Schema do Drizzle aplicado
- ✅ Servidor backend funcionando em http://127.0.0.1:3000
- ✅ Frontend rodando (confirmar porta)

## 📦 Containers Docker

### Iniciar o PostgreSQL
```bash
cd server
docker-compose up -d postgres
```

### Verificar status
```bash
docker-compose ps
```

### Parar containers
```bash
docker-compose down
```

### Limpar tudo e começar do zero
```bash
docker-compose down -v
./setup-dev.sh
```

## 🗄️ Banco de Dados

### Aplicar Schema (Drizzle)
```bash
cd server
npx drizzle-kit push
```

### Conectar ao PostgreSQL
```bash
docker exec -it server-postgres-1 psql -U postgres -d brevly
# Senha: brevlypass
```

### Verificar tabelas
```sql
\dt
\d links
SELECT * FROM links;
```

## 💻 Desenvolvimento

### Backend
```bash
cd server
pnpm dev
```
**Rodando em:** http://127.0.0.1:3000

### Frontend
```bash
cd web
pnpm dev
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:brevlypass@localhost:5432/brevly
PORT=3000
HOST=127.0.0.1
NODE_ENV=development
```

## 🧪 Testar API

### Criar um link
```bash
curl -X POST http://127.0.0.1:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://google.com", "shortUrl": "google"}'
```

### Listar links
```bash
curl http://127.0.0.1:3000/api/links
```

### Incrementar hit
```bash
curl -X POST http://127.0.0.1:3000/api/links/{shortUrl}/hit
```

## 🐛 Troubleshooting

### Docker com erro "read-only file system"
1. Feche o Docker Desktop
2. Execute: `osascript -e 'quit app "Docker"'`
3. Aguarde 5 segundos
4. Execute: `open -a Docker`
5. Aguarde ~20 segundos para inicializar

### Erro "relation does not exist"
1. Verifique se o schema está correto em `src/db/schema.ts`
2. Execute: `npx drizzle-kit push`
3. Se persistir, resete o banco:
   ```bash
   docker exec -it server-postgres-1 psql -U postgres -d brevly -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
   npx drizzle-kit push
   ```

### Servidor não inicia
1. Verifique se a porta 3000 está livre: `lsof -i :3000`
2. Verifique se o PostgreSQL está rodando: `docker-compose ps`
3. Verifique as variáveis de ambiente no `.env`

## 📁 Estrutura do Banco

### Tabela: links
- `id` (text, PK) - UUID gerado automaticamente
- `original_url` (text) - URL original
- `short_url` (text) - URL encurtada
- `hits` (integer) - Contador de acessos
- `created_at` (timestamp) - Data de criação
