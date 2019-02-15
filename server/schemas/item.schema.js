module.exports = (sequelize, type) => {
    return sequelize.define('Item', {
        ItemNo : {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement:true
        },
        Description: {type: type.STRING, allowNull: false},
        HSNNo: {type: type.STRING, allowNull: false},
        State: {type: type.STRING, allowNull: false},
    });
};
