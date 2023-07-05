import BDConnection from "../BDConnection";
import * as typeorm from 'typeorm';

describe("bd-coonection", () => {

  it("should throw whan not has a connection", async () => {
    expect(BDConnection.getConnection).toThrowError(new Error('Connection is not established'));
  });

  it("should start connection", async () => {
    const CONNECTION_CREATED = {} as typeorm.Connection;
    const  createConnection = jest.spyOn(typeorm, 'createConnection');
    createConnection.mockImplementation(() => Promise.resolve(CONNECTION_CREATED));

    await BDConnection.start();
    const connection = BDConnection.getConnection();

    expect(createConnection).toBeCalledWith({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.BD_NAME,
      synchronize: true,
      logging: false,
      entities: ['src/domain/model/**.ts'],
      migrations: ['src/domain/repository/migrations/*.ts'],
    });
    expect(connection).toEqual(CONNECTION_CREATED);
  });
});
