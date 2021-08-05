/* eslint-disable @typescript-eslint/quotes */
module.exports = [
  {
    path: "/horarios",
    method: "post",
    action: "createHorario",
    description: "Criacao de uma horario",
  },
  {
    path: "/horarios",
    method: "get",
    action: "getHorario",
    description: "Busca de todos os horario",
  },
  {
    path: "/horarios/:id",
    method: "get",
    action: "getHorarioById",
    description: "Busca de horario por id",
  },
  {
    path: "/horarios/:id",
    method: "put",
    action: "updateHorario",
    description: "Atualiza uma horario por id",
  },
  {
    path: "/horarios/:id",
    method: "delete",
    action: "deleteHorario",
    description: "Deleta uma horario por id",
  },
];
