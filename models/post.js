const db = require("./banco")

const Clientes = db.sequelize.define("Clientes", {
    inputNome: { type: db.Sequelize.STRING },
    inputTelefone: { type: db.Sequelize.INTEGER },
    inputEmail: { type: db.Sequelize.TEXT },
    inputAniversario: { type: db.Sequelize.DATEONLY },
    inputPassword: { type: db.Sequelize.TEXT }
}, { modelName: 'Clientes' })

//Clientes.sync({ alter: true })
module.exports = Clientes