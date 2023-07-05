const { createSala, getSala, getSalaById, getSalaByNome, getSalaByBloco, updateSala, deleteSala } = require("../sala-controller");
const {
  CreateSala,
  DeleteSala,
  FindAllSalas,
  FindByIdSala,
  FindByNomeSala,
  FindByBloco,
  UpdateSala,
} = require("../../../domain/use-case/Sala");

describe("sala-controller", () => {
  const res = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => ({
      send: jest.fn()
    }))
  };

  describe(".createSala", () => {
    let createSalaSpy
    let body = {
      "expected": "result"
    }

    beforeEach(() => {
      createSalaSpy = jest.spyOn(CreateSala.prototype, 'execute');
    })

    it("should create new Sala", async () => {
      const createdBody = {
        ...body,
        id: "fake-id",
      }
      createSalaSpy.mockImplementation(() => createdBody);

      const req = { body };
      await createSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(createdBody);
    })

    it("should throw error when Sala wrong", async () => {
      createSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { body };
      await createSala(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getSala", () => {
    let getSalaSpy
    beforeEach(() => {
      getSalaSpy = jest.spyOn(FindAllSalas.prototype, 'execute');
    })

    it("should findAll Sala", async () => {
      const result = [{ "expected": "result" }];
      getSalaSpy.mockImplementation(() => result);

      const req = {};
      await getSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Sala", async () => {
      getSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = {};
      await getSala(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getSalaById", () => {
    let getSalaByIdSpy
    beforeEach(() => {
      getSalaByIdSpy = jest.spyOn(FindByIdSala.prototype, 'execute');
    })

    it("should find Sala by id", async () => {
      const result = { "expected": "result" };
      getSalaByIdSpy.mockImplementation(() => result);

      const req = { params: {} };
      await getSalaById(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Sala by id", async () => {
      getSalaByIdSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {} };
      await getSalaById(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getSalaByIdSala", () => {
    let getSalaByIdSalaSpy
    beforeEach(() => {
      getSalaByIdSalaSpy = jest.spyOn(FindByIdSala.prototype, 'execute');
    })

    it("should find Sala by sala", async () => {
      const result = { "expected": "result" };
      getSalaByIdSalaSpy.mockImplementation(() => result);

      const req = { params: { id: 'fake-id' } };
      await getSalaById(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Sala by sala", async () => {
      getSalaByIdSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {} };
      await getSalaById(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getSalaByNome", () => {
    let getSalaByNomeSpy
    beforeEach(() => {
      getSalaByNomeSpy = jest.spyOn(FindByNomeSala.prototype, 'execute');
    })

    it("should find Sala by name", async () => {
      const result = { "expected": "result" };
      getSalaByNomeSpy.mockImplementation(() => result);

      const req = { params: { id: 'fake-id' } };
      await getSalaByNome(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Sala by name", async () => {
      getSalaByNomeSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {} };
      await getSalaByNome(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getSalaByBloco", () => {
    let getSalaByBlocoSpy
    beforeEach(() => {
      getSalaByBlocoSpy = jest.spyOn(FindByBloco.prototype, 'execute');
    })

    it("should find Sala by bloco", async () => {
      const result = { "expected": "result" };
      getSalaByBlocoSpy.mockImplementation(() => result);

      const req = { params: { id: 'fake-id' } };
      await getSalaByBloco(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Sala by bloco", async () => {
      getSalaByBlocoSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {} };
      await getSalaByBloco(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".updateSala", () => {
    let updateSalaSpy
    let body = {
      "sala_id": "bad84858-041a-438a-bf69-52906666fea4",
      "descricao": "Célula de Mineração",
      "horario": "08:00",
      "responsavel": "Pedro Mascarenhas",
      "prof_responsavel": "Davi Romero",
      "dia_semana": "Wednesday",
      "data_inicio": "2021-05-22",
      "data_fim": "2021-11-22",
      "recusa_motivo": "",
      "status": "alocado"
    };

    beforeEach(() => {
      updateSalaSpy = jest.spyOn(UpdateSala.prototype, 'execute');
    })

    it("should update Sala", async () => {
      const updatedBody = {
        ...body,
        id: 'fake-updated-id'
      };
      updateSalaSpy.mockImplementation(() => updatedBody);

      const req = { params: { id: 'fake-id' }, body };
      await updateSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(updatedBody);
    })

    it("should throw error when wrong update Sala", async () => {
      updateSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: { id: 'fake-id' }, body: {} };
      await updateSala(req, res);
      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".deleteSala", () => {
    let deleteSalaSpy

    beforeEach(() => {
      deleteSalaSpy = jest.spyOn(DeleteSala.prototype, 'execute');
    })

    it("should delete Sala", async () => {
      const EXPECTED = 'deleted';
      deleteSalaSpy.mockImplementation(() => EXPECTED);

      const req = { params: { id: 'fake-id' } };
      await deleteSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(EXPECTED);
    })

    it("should throw error when wrong delete Sala", async () => {
      deleteSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: { id: 'fake-id' } };
      await deleteSala(req, res);
      expect(res.status).toBeCalledWith(500);
    })
  })
})
