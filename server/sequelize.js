const Sequelize = require('sequelize');
const { host, database, username, password } = require('./configs/database.js');
const CustomerModel = require('./schemas/customer.schema')
const productModel = require('./schemas/product.schema')
const invoiceModel = require('./schemas/invoice.schema')
const itemInvoiceModel = require('./schemas/itemInvoice.schema')

const Op = Sequelize.Op;

// connect to db
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: Op,
});

const Customer = CustomerModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Invoice = invoiceModel(sequelize, Sequelize);
const itemInvoice = itemInvoiceModel(sequelize, Sequelize);


Invoice.belongsTo(Customer, {foreignKey: 'Customer_Id'});
Customer.hasMany(Invoice, {foreignKey: 'Customer_Id'});

itemInvoice.belongsTo(Invoice, {foreignKey: 'Invoice_Id'});
Invoice.hasMany(itemInvoice, {foreignKey: 'Invoice_Id'});

itemInvoice.belongsTo(Product, {foreignKey: 'Product_Id'});
Product.hasMany(itemInvoice, {foreignKey: 'Product_Id'});

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
