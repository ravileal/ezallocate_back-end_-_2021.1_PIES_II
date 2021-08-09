


jest.mock(
  '../src/domain/repository/mysql/BaseRepository',
  () => {
    return jest.fn().mockImplementation(() => {
      console.log("aqasdasdasdasdasdasdasd");
      return {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        delete: jest.fn(),
      };
    })
  }
);


jest.mock(
  '../src/domain/repository/mysql/OcupacaoRepository',
  () => {
    return jest.fn().mockImplementation(() => {
      console.log("aqasdasdasdasdasdasdasd");
      return {
        findByIdSala: jest.fn(),
        findByIdSalaDateDayOfWeek: jest.fn(),
      };
    })
  }
);

import OcupacaoRepository from'../src/domain/repository/mysql/OcupacaoRepository';
import CreateOcupacao from'../src/domain/use-case/Ocupacao/CreateOcupacao';

describe("teste", () => {
  test("deve somar 2 numeros", () => {
    expect(1+1).toBe(2);
  })
  test("novo teste", () => {
    const create = new CreateOcupacao(new OcupacaoRepository());
    expect(1+1).toBe(2);
  })

})
