import moment = require("moment");

interface Ocupacoes {
  id: string;
  sala_id: string;
  descricao: string;
  horario: string;
  responsavel: string;
  prof_responsavel: string;
  dia_semana: string;
  data_inicio: string;
  data_fim: string;
  recusa_motivo: string;
  status: string;
}

let ocupacao: Ocupacoes[] = [];

jest.mock(
  '../src/domain/repository/mysql/OcupacaoRepository',
  () => {
    return jest.fn().mockImplementation(() => {
      return {
        save: jest.fn().mockImplementation((object) => {
          const inArray = ocupacao.some((item) => item.id === object.id);
          if (inArray)
            ocupacao = ocupacao.map((item) => item.id === object.id ? object : item);
          else
            ocupacao.push({
              id: object.id,
              sala_id: object.sala_id,
              descricao: object.descricao,
              horario: object.horario,
              responsavel: object.responsavel,
              prof_responsavel: object.prof_responsavel,
              dia_semana: object.dia_semana,
              data_inicio: object.data_inicio,
              data_fim: object.data_fim,
              recusa_motivo: object.recusa_motivo,
              status: object.status
            });
          return object;
        }),
        findAll: jest.fn().mockImplementation(() => ocupacao),
        findById: jest.fn().mockImplementation((id) => ocupacao.find((item) => item.id === id)),
        delete: jest.fn().mockImplementation((id) => {
          ocupacao = ocupacao.filter((item) => item.id !== id);
          return !ocupacao.some((item) => item.id === id);
        }),
        findByIdSala: jest.fn().mockImplementation((id) => ocupacao.flatMap((item) => item.sala_id === id? item: [])),
        findByIdSalaDateDayOfWeek: jest.fn().mockImplementation((id, dateDay, dayOfWeek, time?) =>
            ocupacao.find((item) =>
              item.sala_id === id &&
              item.dia_semana === dayOfWeek &&
              moment(item.data_inicio).isSameOrBefore(dateDay) &&
              moment(item.data_fim).isSameOrAfter(dateDay) &&
              (time ? item.horario === time : true)
            )
        ),
      };
    })
  }
);

import OcupacaoRepository from'../src/domain/repository/mysql/OcupacaoRepository';
import FindByIdSalaOcupacao from '../src/domain/use-case/Ocupacao/FindByIdSalaOcupacao';
import CreateOcupacao from '../src/domain/use-case/Ocupacao/CreateOcupacao';
import UpdateOcupacao from '../src/domain/use-case/Ocupacao/UpdateOcupacao';
import FindAllOcupacoes from '../src/domain/use-case/Ocupacao/FindAllOcupacoes';
import FindByIdOcupacao from '../src/domain/use-case/Ocupacao/FindByIdOcupacao';
import DeleteOcupacao from '../src/domain/use-case/Ocupacao/DeleteOcupacao';
import FindByIdSalaDayOcupacao from '../src/domain/use-case/Ocupacao/FindByIdSalaDayOcupacao';

describe("Ocupacoes", () => {

  let findAllOcupacoes: FindAllOcupacoes;
  let findByIdSala: FindByIdSalaOcupacao;
  let findById: FindByIdOcupacao;
  let createOcupacao: CreateOcupacao;
  let updateOcupacao: UpdateOcupacao;
  let deleteOcupacao: DeleteOcupacao;
  let findByIdSalaDayOcupacao: FindByIdSalaDayOcupacao;

  beforeEach(() => {
    const mockedRepository = new OcupacaoRepository();
    createOcupacao = new CreateOcupacao(mockedRepository);
    updateOcupacao = new UpdateOcupacao(mockedRepository);
    deleteOcupacao = new DeleteOcupacao(mockedRepository);
    findById = new FindByIdOcupacao(mockedRepository);
    findByIdSala = new FindByIdSalaOcupacao(mockedRepository);
    findAllOcupacoes = new FindAllOcupacoes(mockedRepository);
    findByIdSalaDayOcupacao = new FindByIdSalaDayOcupacao(mockedRepository);
  });

  afterEach(() => {
    ocupacao = [];
  })

  test("deve criar nova ocupacao", async () => {
    const object = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "08:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };

    const result = await createOcupacao.execute(object);

    expect(result).toEqual(object);
  })

  test("deve atualizar ocupacao", async () => {
    const object = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "08:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };

    const updatedObject = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste 2",
      horario: "08:00",
      responsavel: "Irineu da Silva",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };

    await createOcupacao.execute(object);
    const result = await updateOcupacao.execute(updatedObject);

    expect(result).toEqual(updatedObject);
  })

  test("deve buscar ocupacao atualizada", async () => {
    const object = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "08:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };

    const updatedObject = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste 2",
      horario: "08:00",
      responsavel: "Irineu da Silva",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };

    await createOcupacao.execute(object);
    await updateOcupacao.execute(updatedObject);
    const result = await findById.execute({ id: "3e036c18-691c-418b-bf85-dad93a55bdcc" });

    expect(result).toEqual(updatedObject);
  })

  test("deve buscar ocupacao por id da sala", async () => {
    const object = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "08:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };
    await createOcupacao.execute(object);

    const result = await findByIdSala.execute({ id: "f445cd25-f393-4273-95a4-686cd3c08ae7d" });

    expect(result).toEqual([object]);
  })

  test("deve buscar ocupacao por id", async () => {
    const object = {
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "08:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    };
    await createOcupacao.execute(object);

    const result = await findById.execute({ id: "3e036c18-691c-418b-bf85-dad93a55bdcc" });

    expect(result).toEqual(object);
  })

  test("deve buscar todas as ocupacoes", async () => {
    const objects: any = [];
    objects.push({
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });
    objects.push({
      id: "21c4de3f-2076-4880-b48a-133a21a6864d",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Joao",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });

    objects.forEach(async (object: any) => {
      await createOcupacao.execute(object);
    });
    const result = await findAllOcupacoes.execute();

    expect(result).toEqual(objects);
  })


  test("deve deletar ocupacao por id", async () => {
    const objects: any = [];
    objects.push({
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });
    objects.push({
      id: "21c4de3f-2076-4880-b48a-133a21a6864d",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Joao",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });

    objects.forEach(async (object: any) => {
      await createOcupacao.execute(object);
    });
    const result = await deleteOcupacao.execute({ id: "21c4de3f-2076-4880-b48a-133a21a6864d" });

    expect(result).toBe(true);
  })


  test("deve buscar ocupacao por id, sala e dia", async () => {
    const objects: any = [];
    objects.push({
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Sunday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });
    objects.push({
      id: "21c4de3f-2076-4880-b48a-133a21a6864d",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Joao",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-09-06",
      recusa_motivo: "",
      status: "alocado"
    });

    objects.forEach(async (object: any) => {
      await createOcupacao.execute(object);
    });
    const result = await findByIdSalaDayOcupacao.execute({
      id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      dateDay: "2021-08-10"
    });

    expect(result).toEqual(objects[1]);
  })

  test("deve buscar ocupacao por id, sala, dia e hora", async () => {
    const objects: any = [];
    objects.push({
      id: "3e036c18-691c-418b-bf85-dad93a55bdcc",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Irineu",
      prof_responsavel: "",
      dia_semana: "Sunday",
      data_inicio: "2021-07-06",
      data_fim: "2021-07-06",
      recusa_motivo: "",
      status: "alocado"
    });
    objects.push({
      id: "21c4de3f-2076-4880-b48a-133a21a6864d",
      sala_id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      descricao: "Ocupacao de teste",
      horario: "10:00",
      responsavel: "Joao",
      prof_responsavel: "",
      dia_semana: "Tuesday",
      data_inicio: "2021-07-06",
      data_fim: "2021-09-06",
      recusa_motivo: "",
      status: "alocado"
    });

    objects.forEach(async (object: any) => {
      await createOcupacao.execute(object);
    });
    const result = await findByIdSalaDayOcupacao.execute({
      id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
      dateDay: "2021-08-10",
      time: "10:00"
    });

    expect(result).toEqual(objects[1]);
  })

})
