const db = require("./banco")

const Restaurantes = db.sequelize.define("Restaurantes", {
    Nome: { type: db.Sequelize.STRING, allowNull: false },
    CNPJ: { type: db.Sequelize.INTEGER , allowNull: false}
  }, { modelName: 'Restaurantes' })
  
  const Unidades = db.sequelize.define("Unidades", {
    CNPJ: { type: db.Sequelize.STRING, allowNull: false },
    endereco: { type: db.Sequelize.STRING, allowNull: false }
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
  
  Mesas.belongsTo(Ambientes, { foreignKey: 'IdAmbientes' })
  Ambientes.hasMany(Mesas, { foreignKey: 'IdAmbientes' })
  
  const Periodos = db.sequelize.define("Periodos", {
    PeriodosDATA: { type: db.Sequelize.DATEONLY , allowNull: false}
  }, { modelName: 'Periodos' })
  
  const horarios = db.sequelize.define("horarios", {
    HORAfuncionamento: {
      type: db.Sequelize.TINYINT,
      allowNull: false,
      unique: true
    }
  }, { modelName: 'horarios' })
  
  horarios.hasMany(Periodos, { foreignKey: 'Idhorarios' })
  Periodos.belongsTo(horarios, { foreignKey: 'Idhorarios' })
  
  const MesasPeriodos = db.sequelize.define("MesasPeriodos", {
    Disponivel: { type: db.Sequelize.BOOLEAN , allowNull: false}
  }, { modelName: 'MesasPeriodos' })
  
  Periodos.belongsToMany(Mesas, { through: MesasPeriodos });
  Mesas.belongsToMany(Periodos, { through: MesasPeriodos });
  
  const Reservas = db.sequelize.define("Reservas", {
  }, { modelName: 'Reservas' })
  Reservas.belongsTo(MesasPeriodos, { foreignKey: 'IdMesasPeriodos' })
  MesasPeriodos.hasMany(Reservas, { foreignKey: 'IdMesasPeriodos' })
  
  const Clientes = db.sequelize.define("Clientes", {
    inputNome: { type: db.Sequelize.STRING , allowNull: false },
    inputTelefone: { type: db.Sequelize.INTEGER },
    inputEmail: { type: db.Sequelize.TEXT , allowNull: false, unique: true },
    inputAniversario: { type: db.Sequelize.DATEONLY },
    inputPassword: { type: db.Sequelize.TEXT, allowNull: false }
  }, { modelName: 'Clientes' })
  
  Clientes.hasMany(Reservas, { foreignKey: 'IdClientes' })
  Reservas.belongsTo(Clientes, { foreignKey: 'IdClientes' })

//Reservas.sync({ alter: true })
module.exports = Reservas
