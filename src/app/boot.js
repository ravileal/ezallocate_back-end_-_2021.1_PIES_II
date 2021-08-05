/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
const {
  BDConnection,
  SalaRepository,
  OcupacaoRepository,
  HorarioRepository,
} = require("../domain/repository/mysql");
const { salaRouter, horarioRouter, ocupacaoRouter } = require("./router");
const {
  SalaController,
  OcupacaoController,
  HorarioController,
} = require("./controller");

const setExpressRoute = (app, route, controller) =>
  app[route.method](route.path, controller[route.action]);

const configureRoutes = ({
  app,
  routers,
  controller,
  repository: Repository,
}) => {
  controller.setRepository(new Repository());
  routers.forEach((route) => setExpressRoute(app, route, controller));
};

const setConfiguration = (app, configs) => {
  configs.forEach((config) => configureRoutes({ app, ...config }));
};

const configuration = [
  {
    routers: salaRouter,
    controller: SalaController,
    repository: SalaRepository,
  },
  {
    routers: ocupacaoRouter,
    controller: OcupacaoController,
    repository: OcupacaoRepository,
  },
  {
    routers: horarioRouter,
    controller: HorarioController,
    repository: HorarioRepository,
  },
];

module.exports = async (app) => {
  await BDConnection.start();
  setConfiguration(app, configuration);
};
