const { createOcupacao, getOcupacao, getOcupacaoById, getOcupacaoByIdSala, updateOcupacao, deleteOcupacao } = require("../ocupacao-controller");
const {
  CreateOcupacao,
  DeleteOcupacao,
  FindAllOcupacoes,
  FindByIdOcupacao,
  FindByIdSalaOcupacao,
  FindByIdSalaDayOcupacao,
  UpdateOcupacao,
} = require("../../../domain/use-case/Ocupacao");
const { randomUUID: uuid } = require("crypto");

describe("ocupacao-controller", () => {
  const res = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => ({
      send: jest.fn()
    }))
  };

  describe(".createOcupacao", () => {
    let createOcupacaoSpy
    beforeEach(() => {
      createOcupacaoSpy = jest.spyOn(CreateOcupacao.prototype, 'execute');
    })

    it("should create new Ocupacao", async () => {
      createOcupacaoSpy.mockImplementation((data) => ({
        ...data, id: data.id()
      }));

      let id = "";
      const req = {
        body: {
          "id": () => {
            id = uuid();
            return id;
          },
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
        }
      };
      await createOcupacao(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith({
        ...req.body,
        id
      });
    })

    it("should throw error when Ocupacao wrong", async () => {
      createOcupacaoSpy.mockImplementation(() => {
        throw new Error()
      });

      let id = "";
      const req = {
        body: {
          "id": () => {
            id = uuid();
            return id;
          },
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
        }
      };
      await createOcupacao(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getOcupacao", () => {
    let getOcupacaoSpy
    beforeEach(() => {
      getOcupacaoSpy = jest.spyOn(FindAllOcupacoes.prototype, 'execute');
    })

    it("should findAll Ocupacao", async () => {
      const result = [{
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
      }];
      getOcupacaoSpy.mockImplementation(() => result);

      const req = {};
      await getOcupacao(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Ocupacao", async () => {
      getOcupacaoSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = {};
      await getOcupacao(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getOcupacaoById", () => {
    let getOcupacaoByIdSpy
    beforeEach(() => {
      getOcupacaoByIdSpy = jest.spyOn(FindByIdOcupacao.prototype, 'execute');
    })

    it("should find Ocupacao by id", async () => {
      const result = {
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
      getOcupacaoByIdSpy.mockImplementation(() => result);

      const req = { params: {} };
      await getOcupacaoById(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Ocupacao by id", async () => {
      getOcupacaoByIdSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {} };
      await getOcupacaoById(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".getOcupacaoByIdSala", () => {
    let getOcupacaoByIdSalaSpy
    let getOcupacaoByIdSalaDaySpy
    beforeEach(() => {
      getOcupacaoByIdSalaSpy = jest.spyOn(FindByIdSalaOcupacao.prototype, 'execute');
      getOcupacaoByIdSalaDaySpy = jest.spyOn(FindByIdSalaDayOcupacao.prototype, 'execute');
    })

    it("should find Ocupacao by sala with query", async () => {
      const result = {
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
      getOcupacaoByIdSalaSpy.mockImplementation(() => result);

      const req = { params: { id: uuid() }, query: {} };
      await getOcupacaoByIdSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should find Ocupacao by sala without query", async () => {
      const result = {
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
      getOcupacaoByIdSalaDaySpy.mockImplementation(() => result);

      const req = { params: { id: uuid() }, query: { day: "fake" } };
      await getOcupacaoByIdSala(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(result);
    })

    it("should throw error when wrong get Ocupacao by sala", async () => {
      getOcupacaoByIdSalaSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: {}, query: {} };
      await getOcupacaoByIdSala(req, res);

      expect(res.status).toBeCalledWith(500);
    })
  })


  describe(".updateOcupacao", () => {
    let updateOcupacaoSpy
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
      updateOcupacaoSpy = jest.spyOn(UpdateOcupacao.prototype, 'execute');
    })

    it("should update Ocupacao", async () => {
      const updatedBody = {
        ...body,
        id: 'fake-updated-id'
      };
      updateOcupacaoSpy.mockImplementation(() => updatedBody);

      const req = { params: { id: 'fake-id' }, body };
      await updateOcupacao(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(updatedBody);
    })

    it("should throw error when wrong update Ocupacao", async () => {
      updateOcupacaoSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: { id: 'fake-id' }, body: {} };
      await updateOcupacao(req, res);
      expect(res.status).toBeCalledWith(500);
    })
  })

  describe(".deleteOcupacao", () => {
    let deleteOcupacaoSpy

    beforeEach(() => {
      deleteOcupacaoSpy = jest.spyOn(DeleteOcupacao.prototype, 'execute');
    })

    it("should delete Ocupacao", async () => {
      const EXPECTED = 'deleted';
      deleteOcupacaoSpy.mockImplementation(() => EXPECTED);

      const req = { params: { id: 'fake-id' } };
      await deleteOcupacao(req, res);

      expect(res.status).not.toBeCalled();
      expect(res.send).toBeCalledWith(EXPECTED);
    })

    it("should throw error when wrong delete Ocupacao", async () => {
      deleteOcupacaoSpy.mockImplementation(() => {
        throw new Error()
      });

      const req = { params: { id: 'fake-id' } };
      await deleteOcupacao(req, res);
      expect(res.status).toBeCalledWith(500);
    })
  })
})
