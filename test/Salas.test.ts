
interface Salas {
  id :string;
  nome :string;
  bloco :string;
  ar_condicionado :boolean;
  projetor :boolean;
  roteador :boolean;
  bloqueado :boolean;
  computadores : number;
  capacidade : number;
  tomada_rede : number;
  tomada_energia : number;
}

let salas: Salas[] = [];

jest.mock(
  '../src/domain/repository/mysql/SalaRepository',
  () => {
    return jest.fn().mockImplementation(() => {
      return {
        save: jest.fn().mockImplementation((object) => {
          const inArray = salas.some((item) => item.id === object.id);
          if (inArray)
            salas = salas.map((item) => item.id === object.id ? object : item);
          else
            salas.push({
              id : object.id,
              nome: object.nome,
              bloco : object.bloco,
              ar_condicionado : object.ar_condicionado,
              projetor : object.projetor,
              roteador : object.roteador,
              bloqueado : object.bloqueado,
              computadores : object.computadores,
              capacidade : object.capacidade,
              tomada_rede : object.tomada_rede,
              tomada_energia : object.tomada_energia,
            });
          return object;
        }),
        findAll: jest.fn().mockImplementation(() => salas),
        findById: jest.fn().mockImplementation((id) => salas.find((item) => item.id === id)),
        findByBloco: jest.fn().mockImplementation((bloco) => salas.find((item) => item.bloco === bloco)),
        findByNome: jest.fn().mockImplementation((nome) => salas.find((item) => item.nome === nome)),
        delete: jest.fn().mockImplementation((id) => {
          salas = salas.filter((item) => item.id !== id);
          return !salas.some((item) => item.id === id);
        }),
      };
    })
  }
);

import SalaRepository from'../src/domain/repository/mysql/SalaRepository';
import FindByNomeSala from '../src/domain/use-case/Sala/FindByNomeSala';
import CreateSala from '../src/domain/use-case/Sala/CreateSala';
import UpdateSala from '../src/domain/use-case/Sala/UpdateSala';
import FindAllSala from '../src/domain/use-case/Sala/FindAllSala';
import FindByIdSala from '../src/domain/use-case/Sala/FindByIdSala';
import DeleteSala from '../src/domain/use-case/Sala/DeleteSala';
import FindByBloco from '../src/domain/use-case/Sala/FindByBloco';

describe("Sala", () => {

  let findAllSala: FindAllSala;
  let findByNomeSala: FindByNomeSala;
  let findById: FindByIdSala;
  let createSala: CreateSala;
  let updateSala: UpdateSala;
  let deleteSala: DeleteSala;
  let findByBloco: FindByBloco;

  beforeEach(() => {
    const mockedRepository = new SalaRepository();
    createSala = new CreateSala(mockedRepository);
    updateSala = new UpdateSala(mockedRepository);
    deleteSala = new DeleteSala(mockedRepository);
    findById = new FindByIdSala(mockedRepository);
    findByNomeSala = new FindByNomeSala(mockedRepository);
    findAllSala = new FindAllSala(mockedRepository);
    findByBloco = new FindByBloco(mockedRepository);
  });

  afterEach(() => {
    salas = [];
  })

  test("deve criar nova salas", async () => {
    const object = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "asd",
      bloco : "Bloco 1",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };

    const result = await createSala.execute(object);

    expect(result).toEqual(object);
  })

  test("deve atualizar salas", async () => {
    const object = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "asd",
      bloco : "Bloco 1",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };

    const updatedObject = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };

    await createSala.execute(object);
    const result = await updateSala.execute(updatedObject);

    expect(result).toEqual(updatedObject);
  })

  test("deve buscar salas atualizada", async () => {
    const object = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "asd",
      bloco : "Bloco 1",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };

    const updatedObject = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };

    await createSala.execute(object);
    await updateSala.execute(updatedObject);
    const result = await findById.execute({ id: "1aa561e1-307e-4604-86d5-d1e9988e1baf" });

    expect(result).toEqual(updatedObject);
  })

  test("deve buscar salas por id", async () => {
    const object = {
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    };
    await createSala.execute(object);

    const result = await findById.execute({ id: "1aa561e1-307e-4604-86d5-d1e9988e1baf" });

    expect(result).toEqual(object);
  })

  test("deve buscar todas as ocupacoes", async () => {
    const objects: any = [];
    objects.push({
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });
    objects.push({
      id : "7b888085-4c05-4a33-a227-d8b19141f9ec",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });

    objects.forEach(async (object: any) => {
      await createSala.execute(object);
    });
    const result = await findAllSala.execute();

    expect(result).toEqual(objects);
  })


  test("deve deletar salas por id", async () => {
    const objects: any = [];
    objects.push({
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });
    objects.push({
      id : "7b888085-4c05-4a33-a227-d8b19141f9ec",
      nome: "Nova sala 34",
      bloco : "Bloco 24",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });

    objects.forEach(async (object: any) => {
      await createSala.execute(object);
    });
    const result = await deleteSala.execute({ id: "21c4de3f-2076-4880-b48a-133a21a6864d" });

    expect(result).toBe(true);
  })

  test("deve buscar por salas por bloco", async () => {
    const objects: any = [];
    objects.push({
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });
    objects.push({
      id : "7b888085-4c05-4a33-a227-d8b19141f9ec",
      nome: "Nova sala 34",
      bloco : "Bloco 24",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });

    objects.forEach(async (object: any) => {
      await createSala.execute(object);
    });
    const result = await findByBloco.execute({ name: "Bloco 24" });

    expect(result).toEqual(objects[1]);
  })

  test("deve buscar por salas por nome", async () => {
    const objects: any = [];
    objects.push({
      id : "1aa561e1-307e-4604-86d5-d1e9988e1baf",
      nome: "Nova sala 2",
      bloco : "Bloco 4",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });
    objects.push({
      id : "7b888085-4c05-4a33-a227-d8b19141f9ec",
      nome: "Nova sala 34",
      bloco : "Bloco 24",
      ar_condicionado : true,
      projetor : true,
      roteador : true,
      bloqueado : false,
      computadores : 10,
      capacidade : 10,
      tomada_rede : 10,
      tomada_energia : 10,
    });

    objects.forEach(async (object: any) => {
      await createSala.execute(object);
    });
    const result = await findByNomeSala.execute({ name: "Nova sala 34" });

    expect(result).toEqual(objects[1]);
  })

})
