module.exports = (sequelize, type) => {
    return sequelize.define('party', {
        NO : {
            primaryKey: true,
            type: type.INTEGER,
        },
        Party: {type: type.STRING, allowNull: false},
        Address: {type: type.STRING, allowNull: false},
        GSTNo: {type: type.STRING, allowNull: false, isUnique :true},
        City:  {type: type.STRING},
        State: {type: type.STRING, allowNull: false},
    },{freezeTableName: true, timestamps: false,});
};
