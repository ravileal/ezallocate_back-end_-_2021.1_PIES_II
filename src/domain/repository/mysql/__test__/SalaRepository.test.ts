import SalaRepository from "../SalaRepository";
import BDConnection from "../BDConnection";
import Sala from "../../../model/Sala";

describe("sala-respository", () => {
  let salaRepositoryMocked: any;

  beforeEach(() => {
    const connection = jest.spyOn(BDConnection as any, 'getConnection');
    connection.mockImplementation(() => ({
      getRepository: () => salaRepositoryMocked
    }));
  });

  describe(".findBy", () => {
    const salaList: [Sala] = [
      new Sala({
        nome: 'fake-nome',
        bloco: 'fake-bloco',
        ar_condicionado: false,
        projetor: false,
        roteador: false,
        bloqueado: false,
        computadores: 0,
        capacidade: 0,
        tomada_rede: 0,
        tomada_energia: 0,
      })
    ];

    describe("nome", () => {
      type payload = {
        nome: string
      };

      const findOne = jest.fn().mockImplementation((data: payload) =>
        salaList.find(sala => sala.nome === data.nome)
      );

      beforeEach(() => {
        salaRepositoryMocked = ({ findOne });
      });

      it("should find sala by nome", async () => {
        const salaRepositoy = new SalaRepository();

        const SALA_NOME_PAYLOAD = "fake-nome";
        const salaFound = await salaRepositoy.findByNome(SALA_NOME_PAYLOAD);

        expect(findOne).toBeCalledWith({ nome: SALA_NOME_PAYLOAD });
        expect(salaFound).toEqual(salaList[0]);
      });
    });

    describe("bloco", () => {
      type payload = {
        where: { bloco: string },
        order: { nome: string }
      };
      const find = jest.fn().mockImplementation((data: payload) =>
        salaList.find(raw => raw.bloco === data.where.bloco)
      );

      beforeEach(() => {
        salaRepositoryMocked = ({ find });
      });

      it("should find sala by bloco", async () => {
        const salaRepositoy = new SalaRepository();

        const SALA_BLOCO_PAYLOAD = "fake-bloco";
        const salaFound = await salaRepositoy.findByBloco(SALA_BLOCO_PAYLOAD);

        const expectedFind: payload = {
          where: { bloco: SALA_BLOCO_PAYLOAD },
          order: { nome: 'ASC' }
        };
        expect(find).toBeCalledWith(expectedFind);
        expect(salaFound).toEqual(salaList[0]);
      });
    });
  });
});
