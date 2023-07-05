/* eslint-disable @typescript-eslint/quotes */
const {
  CreateOcupacao,
  DeleteOcupacao,
  FindAllOcupacoes,
  FindByIdOcupacao,
  FindByIdSalaOcupacao,
  FindByIdSalaDayOcupacao,
  UpdateOcupacao,
} = require("../../domain/use-case/Ocupacao");

let repositorio;

const setRepository = (rep) => {
  repositorio = rep;
};

const createOcupacao = async (req, res) => {
  try {
    const entity = req.body;
    const create = await new CreateOcupacao(repositorio);
    const result = await create.execute(entity)
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOcupacao = async (req, res) => {
  try {
    const result = await new FindAllOcupacoes(repositorio).execute();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOcupacaoById = async ({ params }, res) => {
  try {
    const result = await new FindByIdOcupacao(repositorio).execute(params);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOcupacaoByIdSala = async ({ params, query }, res) => {
  try {
    const haveQuery = Object.keys(query).length > 0;
    const args = haveQuery ? { ...params, ...query } : params;
    const action = haveQuery
      ? new FindByIdSalaDayOcupacao(repositorio)
      : new FindByIdSalaOcupacao(repositorio);
    const result = await action.execute(args);

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateOcupacao = async ({ params, body }, res) => {
  try {
    const entity = { ...body, ...params };
    const result = await new UpdateOcupacao(repositorio).execute(entity);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOcupacao = async ({ params }, res) => {
  try {
    const result = await new DeleteOcupacao(repositorio).execute(params);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getOcupacao,
  createOcupacao,
  updateOcupacao,
  deleteOcupacao,
  getOcupacaoById,
  getOcupacaoByIdSala,
  setRepository,
};
