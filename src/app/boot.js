/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
const {
  BDConnection /* SalaRepository */,
} = require("../domain/repository/mysql");
const salaRouter = require("./router/sala-router");
const salaCtrl = require("./controller/SalaController");
const { SalaRepository } = require("../domain/repository/mysql");

module.exports = async (app) => {
  await BDConnection.start();

  salaCtrl.setRepository(new SalaRepository());

  salaRouter.map((route) =>
    app[route.method](route.path, salaCtrl[route.action])
  );
};
