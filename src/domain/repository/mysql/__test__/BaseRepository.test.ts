import BaseRepository from "../BaseRepository";
import BDConnection from "../BDConnection";
import Base from "../../../model/Base";

describe("base-respository", () => {
  let baseRepositoryMocked: any;

  beforeEach(() => {
    const connection = jest.spyOn(BDConnection as any, 'getConnection');
    connection.mockImplementation(() => ({
      getRepository: () => baseRepositoryMocked
    }));
  });

  describe(".save", () => {
    const baseRaw: (Base) = {
      id: 'fake-id',
    };
    const save = jest.fn().mockImplementation((data: Base) => data);

    beforeEach(() => {
      baseRepositoryMocked = ({ save });
    });

    it("should create new Entity", async () => {
      const baseRepositoy = new BaseRepository('');
      const basePayload: Base = baseRaw;

      const baseSaved = await baseRepositoy.save(basePayload);

      expect(save).toBeCalledWith(basePayload);
      expect(baseSaved).toEqual(basePayload);
    });
  });

  describe(".find", () => {
    const baseList: [Base] = [
      { id: 'fake-id' } as Base
    ];

    describe("byId", () => {
      type payload = string;

      const findOne = jest.fn().mockImplementation((id: payload) =>
        baseList.find(base => base.id === id)
      );

      beforeEach(() => {
        baseRepositoryMocked = ({ findOne });
      });

      it("should find base by id", async () => {
        const baseRepositoy = new BaseRepository('');

        const BASE_ID_PAYLOAD = "fake-id";
        const baseFound = await baseRepositoy.findById(BASE_ID_PAYLOAD);

        expect(findOne).toBeCalledWith(BASE_ID_PAYLOAD);
        expect(baseFound).toEqual(baseList[0]);
      });
    });

    describe("all", () => {
      const find = jest.fn().mockImplementation(() => baseList);

      beforeEach(() => {
        baseRepositoryMocked = ({ find });
      });

      it("should find base by bloco", async () => {
        const baseRepositoy = new BaseRepository('');

        const baseFound = await baseRepositoy.findAll();

        expect(find).toBeCalledWith();
        expect(baseFound).toEqual(baseList);
      });
    });
  });

  describe(".delete", () => {
    const deleteFn = jest.fn().mockImplementation((data: Base) => data);

    beforeEach(() => {
      baseRepositoryMocked = ({ delete: deleteFn });
    });

    it("should create new Entity", async () => {
      const baseRepositoy = new BaseRepository('');
      const basePayload: string = 'fake-id';

      const baseDeleted = await baseRepositoy.delete(basePayload);

      expect(deleteFn).toBeCalledWith(basePayload);
      expect(baseDeleted).toEqual(basePayload);
    });
  });
});
