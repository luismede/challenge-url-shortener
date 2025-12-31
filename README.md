# URL Shortener API

API simples de encurtamento de URLs, desenvolvida como solução para o desafio:
[Link para o desafio](https://github.com/backend-br/desafios/blob/master/url-shortener/PROBLEM.md)
.

O projeto permite criar URLs curtas e redirecionar para a URL original de maneira simples e rápida.

## Desafio
O objetivo do desafio é criar um serviço de encurtamento de URLs que:

- Receba uma URL longa
- Gere um código curto único
- Permita redirecionamento via URL curta
- Garanta validade/expiração do link
- Retorne respostas HTTP adequadas

## Inicializando o projeto
#### 1. Clone o repositório
```bash
git clone https://github.com/luismede/challenge-url-shortener.git
cd challenge-url-shortener
```
#### 2. Instale as dependências
```bash
bun install
```

#### 3. Configure as variáveis de ambiente
crie um arquivo `.env`
```bash
MONGODB_URI=mongodb://localhost:27017/encurtadorUrl
BASE_URI=http://localhost:3000
```

#### 4. Executando o Projeto
```bash
bun run dev
```

---

## Endpoints
#### Criar url encurtada
- [POST] `/shorten-url`
```json
{
  "url": "https://hono.dev/docs/api/hono"
}
```

---

#### Redirecionar URL curta
GET `/:code`
```bash
Ex.: /aZ9xQ2
```

**Comportamento**

- Redireciona para a URL original
- Retorna erro se o código não existir
- Retorna erro se o link estiver expirado

---

## Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado, seguindo o desafio proposto pela comunidade backend-br.