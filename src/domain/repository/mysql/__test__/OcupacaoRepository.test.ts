import OcupacaoRepository from "../OcupacaoRepository";
import BDConnection from "../BDConnection";
import Ocupacao from "../../../model/Ocupacao";
import { FindOperator, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

describe("ocupacao-respository", () => {
  let ocupacaoRepositoryMocked: any;

  beforeEach(() => {
    const connection = jest.spyOn(BDConnection as any, 'getConnection');
    connection.mockImplementation(() => ({
      getRepository: () => ocupacaoRepositoryMocked
    }));
  });

  describe(".findBy", () => {
    const ocupacaoList: [Ocupacao] = [
      new Ocupacao({
        sala: 'fake-bloco',
        sala_id: 'fake-sala_id',
        descricao: 'fake-descricao',
        horario: '15:00',
        dia_semana: 'sunday',
        responsavel: 'fake-responsavel',
        prof_responsavel: 'fake-prof_responsavel',
        data_inicio: '18-06-23',
        data_fim: '18-07-23',
        recusa_motivo: 'fake-recusa_motivo',
        status: 'fake-status',
      })
    ];

    describe("idSala", () => {
      type payload = {
        sala_id: string
      };

      const findOne = jest.fn().mockImplementation((data: payload) =>
        ocupacaoList.find(ocupacao => ocupacao.sala_id === data.sala_id)
      );

      beforeEach(() => {
        ocupacaoRepositoryMocked = ({ findOne });
      });

      it("should find ocupacao by sala id", async () => {
        const ocupacaoRepositoy = new OcupacaoRepository();

        const OCUPACAO_SALA_ID_PAYLOAD = "fake-sala_id";
        const ocupacaoFound = await ocupacaoRepositoy.findByIdSala(OCUPACAO_SALA_ID_PAYLOAD);

        expect(findOne).toBeCalledWith({ sala_id: OCUPACAO_SALA_ID_PAYLOAD });
        expect(ocupacaoFound).toEqual(ocupacaoList[0]);
      });
    });

    describe("bloco", () => {
      type payload = {
        sala_id: string,
        horario: string,
        dia_semana: string,
        data_inicio: FindOperator<typeof LessThanOrEqual>,
        data_fim: FindOperator<typeof MoreThanOrEqual>,
      };
      const findOne = jest.fn().mockImplementation((data: payload) =>
        ocupacaoList.find(ocupacao =>
          ocupacao.sala_id === data.sala_id &&
          ocupacao.horario === data.horario &&
          ocupacao.dia_semana === data.dia_semana &&
          ocupacao.data_inicio === data.data_inicio.value
        )
      );

      beforeEach(() => {
        ocupacaoRepositoryMocked = ({ findOne });
      });

      it("should find ocupacao by bloco", async () => {
        const ocupacaoRepositoy = new OcupacaoRepository();

        const ocupacaoFound = await ocupacaoRepositoy
          .findByIdSalaDateDayOfWeek(
            "fake-sala_id",
            "18-06-23",
            "sunday",
            "15:00"
          );

        const expectedFind: payload = {
          sala_id: "fake-sala_id",
          horario: "15:00",
          dia_semana: "sunday",
          data_inicio: expect.any(FindOperator),
          data_fim: expect.any(FindOperator),
        };
        expect(findOne).toBeCalledWith(expectedFind);
        expect(ocupacaoFound).toEqual(ocupacaoList[0]);
      });
    });
  });
});
