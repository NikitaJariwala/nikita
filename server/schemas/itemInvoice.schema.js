module.exports = (sequelize, type) => {
    return sequelize.define('ItemInvoice', {
        ItemNo : {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement:true
        },
        Description: {type: type.STRING, allowNull: false},
        Address: {type: type.STRING, allowNull: false},
        Quantity: {type: type.STRING, allowNull: false},
        Total:  {type: type.STRING, allowNull: false},
        Invoice_Id: {type: type.INTEGER, allowNull: false},
        Product_Id: {type: type.INTEGER, allowNull: false},
    });
};
