const { salaRouter, ocupacaoRouter } = require('../router');
const boot = require('../boot.js');
const { OcupacaoController, SalaController } = require('../controller');
const repository = require('../../domain/repository/mysql');

repository.BDConnection.start = jest.fn();
repository.BDConnection.getConnection = jest.fn().mockImplementation(() => ({
  getRepository: jest.fn()
}));

const app = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('boot', () => {

  beforeEach(async () => {
    await boot(app);
  })
  it.each(salaRouter)('boot sala', async ({ action, method, path }) => {
    expect(app[method]).toBeCalledWith(path, SalaController[action]);
  })

  it.each(ocupacaoRouter)('boot ocupacao', async ({ action, method, path }) => {
    expect(app[method]).toBeCalledWith(path, OcupacaoController[action]);
  })
})
