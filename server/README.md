# Brev.ly Backend

FTR - Pós-gradução Tech Developer 360º - Desafio Prático da Fase 1 - Brev.ly

## Funcionalidades e Regras

- [x] Deve ser possível criar um link
- [x] Não deve ser possível criar um link com URL encurtada mal formatada
- [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
- [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
- [x] Deve ser gerado um nome aleatório e único para o arquivo
- [x] Deve ser possível realizar a listagem de forma performática
- [x] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.



 ---------
### SUBIR O DOCKER
- abrir o docker app
 - docker compose up (if not)
 - docker compose up --build
### Subir servidor
- pnpm dev

### Subir web
- pnpm run dev



TODO:
- Acertar o Link de acesso (adicionar um <a>)
- adicionar funcionalidade copy link (copia original link)
- corrigir delecao de link
- validar requisicoes pro BE (Delete )

---------
