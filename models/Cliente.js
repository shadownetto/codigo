const db = require("./db");

const Cliente = db.sequelize.define("tabela_cliente", {
  nome: {
    type: db.Sequelize.STRING,
  },
  sobreNome: {
    type: db.Sequelize.STRING,
  },
  telefone: {
    type: db.Sequelize.STRING,
  },
});

//Cliente.sync({ force: true }); //depois de criar, comentar ou apagar
module.exports = Cliente;
