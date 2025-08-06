import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

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
// Route Parameters:
// Request Body:

// Query Parameters ex.: http://localhost:3333/users?userId=1&name=Victor

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not Found!');
});

server.listen(3333);
