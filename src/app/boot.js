/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
const { BDConnection, SalaRepository } = require("../domain/repository/mysql");
const salaRouter = require("./router/sala-router");
const salaCtrl = require("./controller/SalaController");

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

const setConfiguration = (app, configuration) => {
  configuration.forEach((config) => configureRoutes({ app, ...config }));
};

module.exports = async (app) => {
  await BDConnection.start();

  const configuration = [
    {
      routers: salaRouter,
      controller: salaCtrl,
      repository: SalaRepository,
    },
  ];

  setConfiguration(app, configuration);
};
