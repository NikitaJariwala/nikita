module.exports = (sequelize, type) => {
    return sequelize.define('Invoice', {
        Invoice_No : {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement:true
        },
        Customer_Id: {type: type.INTEGER, allowNull: false},
    });
};
