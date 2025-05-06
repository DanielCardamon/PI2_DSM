const Sequelize = require("sequelize")
const sequelize = new Sequelize("ReservasOn", "root", "", {
  host: "localhost",
  dialect: "mysql"
})
module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}

sequelize.authenticate().then(function () {
  console.log("Conectado com sucesso")
}).catch(function (erro) {
  console.log("Falha ao conectar: " + erro)
})

const Restaurantes = sequelize.define("Restaurantes", {
  Nome: { type: Sequelize.STRING, allowNull: false },
  CNPJ: { type: Sequelize.INTEGER , allowNull: false}
}, { sequelize, modelName: 'Restaurantes' })

const Unidades = sequelize.define("Unidades", {
  CNPJ: { type: Sequelize.STRING, allowNull: false },
  endereco: { type: Sequelize.STRING, allowNull: false }
}, { sequelize, modelName: 'Unidades' })

Restaurantes.hasMany(Unidades, { foreignKey: 'IdRestaurantes' })
Unidades.belongsTo(Restaurantes, { foreignKey: 'IdRestaurantes' })

const Ambientes = sequelize.define("Ambientes", {
  nome: { type: Sequelize.STRING }
}, { sequelize, modelName: 'Ambientes' })

Unidades.hasMany(Ambientes, { foreignKey: 'IdUnidade' })
Ambientes.belongsTo(Unidades, { foreignKey: 'IdUnidade' })

const Mesas = sequelize.define("Mesas", {
  Assentos: { type: Sequelize.INTEGER }
}, { sequelize, modelName: 'Mesas' })

Mesas.belongsTo(Ambientes, { foreignKey: 'IdAmbientes' })
Ambientes.hasMany(Mesas, { foreignKey: 'IdAmbientes' })

const Periodos = sequelize.define("Periodos", {
  PeriodosDATA: { type: Sequelize.DATEONLY , allowNull: false}
}, { sequelize, modelName: 'Periodos' })

const horarios = sequelize.define("horarios", {
  HORAfuncionamento: {
    type: Sequelize.TINYINT,
    allowNull: false,
    unique: true
  }
}, { sequelize, modelName: 'horarios' })

horarios.hasMany(Periodos, { foreignKey: 'Idhorarios' })
Periodos.belongsTo(horarios, { foreignKey: 'Idhorarios' })

const MesasPeriodos = sequelize.define("MesasPeriodos", {
  Disponivel: { type: Sequelize.BOOLEAN , allowNull: false}
}, { sequelize, modelName: 'MesasPeriodos' })

Periodos.belongsToMany(Mesas, { through: MesasPeriodos });
Mesas.belongsToMany(Periodos, { through: MesasPeriodos });

const Reservas = sequelize.define("Reservas", {
}, { sequelize, modelName: 'Reservas' })
Reservas.belongsTo(MesasPeriodos, { foreignKey: 'IdMesasPeriodos' })
MesasPeriodos.hasMany(Reservas, { foreignKey: 'IdMesasPeriodos' })

const Clientes = sequelize.define("Clientes", {
  inputNome: { type: Sequelize.STRING , allowNull: false },
  inputTelefone: { type: Sequelize.INTEGER },
  inputEmail: { type: Sequelize.TEXT , allowNull: false, unique: true },
  inputAniversario: { type: Sequelize.DATEONLY },
  inputPassword: { type: Sequelize.TEXT, allowNull: false }
}, { sequelize, modelName: 'Clientes' })

Clientes.hasMany(Reservas, { foreignKey: 'IdClientes' })
Reservas.belongsTo(Clientes, { foreignKey: 'IdClientes' })

sequelize.sync({ alter: true })
console.log("All models were synchronized successfully.")
//Agendamento.sync({ force: true })
//Agendamento.sync({ })


/*// EXx foreingKey
MainClient.hasOne(MainDashboard, { foreignKey: 'idClient', foreignKeyConstraint: true })
MainClient.hasOne(MainDashboard, { foreignKey: 'clientId' })
MainDashboard.belongsTo(MainClient, { foreignKey: 'clientId' })


// EXx foreingKey
const User = sequelize.define('user', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
});

const Project = sequelize.define('project', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

// track which projects a user is associated with
const UserProject = sequelize.define('userProject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
// add user id foreign key to all projects
Project.belongsTo(User, { foreignKey: 'id_manager' });
User.hasMany(Project, { foreignKey: 'id_manager' });

// makes a join table between the users and projects
// 'through' key sets the name of the table: user_projects
User.belongsToMany(Project, { through: UserProject, foreignKey: 'id_user' });
Project.belongsToMany(User, { through: UserProject, foreignKey: 'id_project' });



async function addProject(userId, projectObj) {
  // find the user record
  const user = await User.findOne({ where: { id: userId } });
  // create the project
  const project = await Project.create(projectObj);
  // set the user (project manager) foreign key
  project.setUser(user);
}

async function joinUserProject(userId, projectId) {
  // find the user & project
  const user = await User.findOne({ where: { id: userId } });
  const project = await Project.findOne({ where: { id: projectId } });
  // add project and user to the join table with the custom method:
  project.addUser(user);
}

*///