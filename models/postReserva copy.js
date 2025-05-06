const db = require("./banco")

const Restaurantes = db.sequelize.define("Restaurantes", {
    Nome: { type: db.Sequelize.STRING },
    CNPJ: { type: db.Sequelize.INTEGER }
}, { modelName: 'Restaurantes' })


const Unidades = db.sequelize.define("Unidades", {
    CNPJ: { type: db.Sequelize.STRING },
    endereco: { type: db.Sequelize.STRING }
}, { modelName: 'Unidades' })

Restaurantes.hasMany(Unidades, { foreignKey: 'IdRestaurantes' })
Unidades.belongsTo(Restaurantes, { foreignKey: 'IdRestaurantes' })


const Ambientes = db.sequelize.define("Ambientes", {
    nome: { type: db.Sequelize.STRING }
}, { modelName: 'Ambientes' })

Unidades.hasMany(Ambientes, { foreignKey: 'IdUnidade' })
Ambientes.belongsTo(Unidades, { foreignKey: 'IdUnidade' })

const Mesas = db.sequelize.define("Mesas", {
    Assentos: { type: db.Sequelize.INTEGER }
}, { modelName: 'Mesas' })

Ambientes.hasMany(Mesas, { foreignKey: 'IdAmbientes' })
Mesas.belongsTo(Ambientes, { foreignKey: 'IdAmbientes' })

const Periodos = db.sequelize.define("Periodos", {
    PeriodosDATA: { type: db.Sequelize.DATEONLY },
    PeriodosHORA: { type: db.Sequelize.TIME }
}, { modelName: 'Periodos' })


const Reservas = db.sequelize.define("Reservas", {
}, { modelName: 'Reservas' })
Reservas.hasOne(Periodos, { foreignKey: 'IdPeriodos' })
Reservas.hasOne(Mesas, { foreignKey: 'IdMesas' })

const Clientes = db.sequelize.define("Clientes", {
    inputNome: { type: db.Sequelize.STRING },
    inputTelefone: { type: db.Sequelize.INTEGER },
    inputEmail: { type: db.Sequelize.TEXT },
    inputAniversario: { type: db.Sequelize.DATEONLY },
    inputPassword: { type: db.Sequelize.TEXT }
}, { modelName: 'Clientes' })

Clientes.hasMany(Reservas, { foreignKey: 'IdClientes' })
Reservas.belongsTo(Clientes, { foreignKey: 'IdClientes' })

//Reservas.sync({ alter: true })
module.exports = Clientes
module.exports = Reservas
module.exports = Periodos
module.exports = Mesas
module.exports = Ambientes
module.exports = Unidades
module.exports = Restaurantes