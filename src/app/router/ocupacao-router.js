/* eslint-disable @typescript-eslint/quotes */
module.exports = [
  {
    path: "/ocupacoes",
    method: "post",
    action: "createOcupacao",
    description: "Criacao de uma ocupacao",
  },
  {
    path: "/ocupacoes",
    method: "get",
    action: "getOcupacao",
    description: "Busca de todos as ocupacoes",
  },
  {
    path: "/ocupacoes/:id",
    method: "get",
    action: "getOcupacaoById",
    description: "Busca de ocupacao por id",
  },
  {
    path: "/ocupacoes/sala/:id",
    method: "get",
    action: "getOcupacaoByIdSala",
    description: "Busca de todos as ocupacoes por id de sala",
  },
  {
    path: "/ocupacoes/:id",
    method: "put",
    action: "updateOcupacao",
    description: "Atualiza uma ocupacao por id",
  },
  {
    path: "/ocupacoes/:id",
    method: "delete",
    action: "deleteOcupacao",
    description: "Deleta uma ocupacao por id",
  },
];
