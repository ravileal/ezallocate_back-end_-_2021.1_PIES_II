"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
let ocupacao = [];
jest.mock('../src/domain/repository/mysql/OcupacaoRepository', () => {
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
            findByIdSala: jest.fn().mockImplementation((id) => ocupacao.flatMap((item) => item.sala_id === id ? item : [])),
            findByIdSalaDateDayOfWeek: jest.fn().mockImplementation((id, dateDay, dayOfWeek, time) => ocupacao.find((item) => item.sala_id === id &&
                item.dia_semana === dayOfWeek &&
                moment(item.data_inicio).isSameOrBefore(dateDay) &&
                moment(item.data_fim).isSameOrAfter(dateDay) &&
                (time ? item.horario === time : true))),
        };
    });
});
const OcupacaoRepository_1 = __importDefault(require("../src/domain/repository/mysql/OcupacaoRepository"));
const FindByIdSalaOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/FindByIdSalaOcupacao"));
const CreateOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/CreateOcupacao"));
const UpdateOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/UpdateOcupacao"));
const FindAllOcupacoes_1 = __importDefault(require("../src/domain/use-case/Ocupacao/FindAllOcupacoes"));
const FindByIdOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/FindByIdOcupacao"));
const DeleteOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/DeleteOcupacao"));
const FindByIdSalaDayOcupacao_1 = __importDefault(require("../src/domain/use-case/Ocupacao/FindByIdSalaDayOcupacao"));
describe("Ocupacoes", () => {
    let findAllOcupacoes;
    let findByIdSala;
    let findById;
    let createOcupacao;
    let updateOcupacao;
    let deleteOcupacao;
    let findByIdSalaDayOcupacao;
    beforeEach(() => {
        const mockedRepository = new OcupacaoRepository_1.default();
        createOcupacao = new CreateOcupacao_1.default(mockedRepository);
        updateOcupacao = new UpdateOcupacao_1.default(mockedRepository);
        deleteOcupacao = new DeleteOcupacao_1.default(mockedRepository);
        findById = new FindByIdOcupacao_1.default(mockedRepository);
        findByIdSala = new FindByIdSalaOcupacao_1.default(mockedRepository);
        findAllOcupacoes = new FindAllOcupacoes_1.default(mockedRepository);
        findByIdSalaDayOcupacao = new FindByIdSalaDayOcupacao_1.default(mockedRepository);
    });
    afterEach(() => {
        ocupacao = [];
    });
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
    });
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
    });
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
    });
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
        const result = await findByIdSala.execute({ id: "f445cd25-f393-4273-95a4-686cd3c08ae7" });
        expect(result).toEqual([object]);
    });
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
    });
    test("deve buscar todas as ocupacoes", async () => {
        const objects = [];
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
        objects.forEach(async (object) => {
            await createOcupacao.execute(object);
        });
        const result = await findAllOcupacoes.execute();
        expect(result).toEqual(objects);
    });
    test("deve deletar ocupacao por id", async () => {
        const objects = [];
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
        objects.forEach(async (object) => {
            await createOcupacao.execute(object);
        });
        const result = await deleteOcupacao.execute({ id: "21c4de3f-2076-4880-b48a-133a21a6864d" });
        expect(result).toBe(true);
    });
    test("deve buscar ocupacao por id, sala e dia", async () => {
        const objects = [];
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
        objects.forEach(async (object) => {
            await createOcupacao.execute(object);
        });
        const result = await findByIdSalaDayOcupacao.execute({
            id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
            dateDay: "2021-08-10"
        });
        expect(result).toEqual(objects[1]);
    });
    test("deve buscar ocupacao por id, sala, dia e hora", async () => {
        const objects = [];
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
        objects.forEach(async (object) => {
            await createOcupacao.execute(object);
        });
        const result = await findByIdSalaDayOcupacao.execute({
            id: "f445cd25-f393-4273-95a4-686cd3c08ae7",
            dateDay: "2021-08-10",
            time: "10:00"
        });
        expect(result).toEqual(objects[1]);
    });
});
