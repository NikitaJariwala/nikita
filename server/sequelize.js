const Sequelize = require('sequelize');
const { host, database, username, password } = require('./configs/database.js');
const CustomerModel = require('./schemas/customer.schema')

const Op = Sequelize.Op;

// connect to db
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: Op,
});

const Customer = CustomerModel(sequelize, Sequelize);


// Solicitation.belongsTo(Applicant, {foreignKey: 'Solicitation_Admin'});
// Applicant.hasMany(Solicitation, {foreignKey: 'Solicitation_Admin'});


sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Mysql connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = { Customer };
