module.exports = (sequelize, type) => {
    return sequelize.define('Customer', {
        CustomerNo : {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement:true
        },
        Name: {type: type.STRING, allowNull: false},
        Address: {type: type.STRING, allowNull: false},
        GSTNo: {type: type.STRING, allowNull: false, isUnique :true},
        City:  {type: type.STRING, allowNull: false},
        State: {type: type.STRING, allowNull: false},
    });
};
