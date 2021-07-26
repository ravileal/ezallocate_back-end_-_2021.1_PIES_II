/* eslint-disable @typescript-eslint/quotes */
module.exports = [
  {
    path: "/salas",
    method: "post",
    action: "createSala",
    description: "Criacao de uma sala",
  },
  {
    path: "/salas",
    method: "get",
    action: "getSala",
    description: "Busca de todas as salas",
  },
  {
    path: "/salas/:id",
    method: "get",
    action: "getSalaById",
    description: "Busca de sala por id",
  },
  {
    path: "/salas/:id",
    method: "put",
    action: "updateSala",
    description: "Atualiza uma sala por id",
  },
  {
    path: "/salas/:id",
    method: "delete",
    action: "deleteSala",
    description: "Deleta uma sala por id",
  },
];
