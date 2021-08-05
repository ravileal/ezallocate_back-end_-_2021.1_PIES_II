/* eslint-disable @typescript-eslint/quotes */
const {
  CreateHorario,
  DeleteHorario,
  FindAllHorarios,
  FindByIdHorario,
  // FindByNomeHorario,
  UpdateHorario,
} = require("../../domain/use-case/Horario");

let repositorio;

const setRepository = (rep) => {
  repositorio = rep;
};

const createHorario = async (req, res) => {
  try {
    const entity = req.body;
    const result = await new CreateHorario(repositorio).execute(entity);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getHorario = async (req, res) => {
  const result = await new FindAllHorarios(repositorio).execute();
  res.send(result);
};

const getHorarioById = async ({ params }, res) => {
  const result = await new FindByIdHorario(repositorio).execute(params);
  res.send(result);
};

// const getHorarioByNome = async ({ params }, res) => {
//   const result = await new FindByNomeHorario(repositorio).execute(params);
//   res.send(result);
// };

const updateHorario = async ({ params, body }, res) => {
  const entity = { ...body, ...params };
  const result = await new UpdateHorario(repositorio).execute(entity);
  res.send(result);
};

const deleteHorario = async ({ params }, res) => {
  const result = await new DeleteHorario(repositorio).execute(params);
  res.send(result);
};

module.exports = {
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario,
  getHorarioById,
  // getHorarioByNome,
  setRepository,
};
