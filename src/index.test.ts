import index from "./index";

jest.mock('./app/boot', () => jest.fn());


describe("index", () => {
  let app: any;

  beforeEach(() => {
    app = {
      use: jest.fn(),
      listen: jest.fn().mockImplementation((port, fun) => {
        fun();
      })
    };
  })

  it("should start server", () => {
    index(app);
    expect(app.use).toBeCalled();
    expect(app.listen).toBeCalledWith(3000, expect.any(Function));
  });
});

