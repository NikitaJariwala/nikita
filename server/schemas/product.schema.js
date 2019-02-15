module.exports = (sequelize, type) => {
    return sequelize.define('Product', {
        ProductNo : {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement:true
        },
        Price: {type: type.STRING, allowNull: false},
        Description: {type: type.STRING, allowNull: false},
        State: {type: type.STRING, allowNull: false},
        HSNCode: {type: type.STRING, allowNull: false},
    });
};
