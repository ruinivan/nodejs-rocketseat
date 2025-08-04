import http from "node:http";

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

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    //Early return
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Jonh",
      email: "jonh@email.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not Found!");
});

server.listen(3333);
