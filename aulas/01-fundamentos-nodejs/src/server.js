import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// - Criar usuário
// - Listagem de usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//  - Métado HTTP
//  - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma recurso do back-end
// POST => Criar uma recurso do back-end
// PUT => Editar ou atualizar um recurso do back-end
// PATCH => Atualizar uma informação única ou específica do back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

// UUID => Unique Universal ID

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios (Parametros nomeados enviados no próprio endereço da requisição)
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs) - fora da url

// Query Parameters ex.: http://localhost:3333/users?userId=1&name=Victor

// Route Parameters ex.: GET http://localhost:3333/users/1
// Route Parameters ex.: DELETE http://localhost:3333/users/1

// Request Body ex.: POST http://localhost:3333/users

// Edição e remoção

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not Found!');
});

server.listen(3333);
