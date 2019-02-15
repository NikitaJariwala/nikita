const { Customer } = require('../sequelize');

const {generateErrorJSON, generateSuccessJSON} = require('../shared/common');

exports.post = (body, done) => {
    let customer = new Customer(body);
    customer.createdAt = new Date();

    return customer.save().then((doc) => {
        done(null,generateSuccessJSON(200, doc));
    }).catch((err) => {
        done(generateErrorJSON(err.message, err));
    });
}

exports.getByID = (id, done) => {
    return Customer.findOne({ where: {CustomerNo: id}}).then((doc) => {
        done(null,generateSuccessJSON(200, doc));
    }).catch((err) => {
        done(generateErrorJSON(err.message, err));
    });
}

exports.getByName = (name, done) => {
    return Customer.findOne({ where: {Name: name}}).then((doc) => {
        done(null,generateSuccessJSON(200, doc));
    }).catch((err) => {
        done(generateErrorJSON(err.message, err));
    });
}

exports.getAll = (done) => {
    return Customer.findAll({where:{}}).then((doc) => {
        done(null,generateSuccessJSON(200, doc));
    }).catch((err) => {
        done(generateErrorJSON(err.message, err));
    });
}

exports.getbyKeyword = (keyword,done) => {
    return Customer.findAll({ where: {
        'Name': { like: '%' + keyword + '%' } ,
    }}).then((doc) => {
        done(null,generateSuccessJSON(200, doc));
    }).catch((err) => {
        done(generateErrorJSON(err.message, err));
    });
}

exports.put = (id, body, done) => {
    let customer = new Customer(body);
    return Customer.update(customer.dataValues, {where: { CustomerNo: id } })
        .then(doc => {
            done(null,generateSuccessJSON(200, doc));
        }).catch((err) => {
            done(generateErrorJSON(err.message, err));
        });
}

exports.roleAuthorization = () => {
    return function (req, res, next) {
        if (req.user && req.user.role == 'Solicitation_Admin') {
            return next()
        }
        else {
            return next('You are not authorized to view this content')
        }
    }
}






