/* eslint-disable @typescript-eslint/quotes */
const {
  CreateSala,
  DeleteSala,
  FindAllSalas,
  FindByIdSala,
  FindByNomeSala,
  UpdateSala,
} = require("../../domain/use-case/Sala");

let repositorio;

const setRepository = (rep) => {
  repositorio = rep;
};

const createSala = async (req, res) => {
  try {
    const entity = req.body;
    const result = await new CreateSala(repositorio).execute(entity);
    // console.log(JSON.stringify(result));
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSala = async (req, res) => {
  const result = await new FindAllSalas(repositorio).execute();
  res.send(result);
};

const getSalaById = async ({ params }, res) => {
  // console.log(params);
  const result = await new FindByIdSala(repositorio).execute(params);
  res.send(result);
};

const getSalaByNome = async ({ params }, res) => {
  // console.log(params);
  const result = await new FindByNomeSala(repositorio).execute(params);
  res.send(result);
};

const updateSala = async ({ body }, res) => {
  const entity = body;
  // console.log(entity);
  const result = await new UpdateSala(repositorio).execute(entity);
  res.send(result);
};

const deleteSala = async ({ params }, res) => {
  const result = await new DeleteSala(repositorio).execute(params);
  res.send(result);
};

module.exports = {
  getSala,
  createSala,
  updateSala,
  deleteSala,
  getSalaById,
  getSalaByNome,
  setRepository,
};
