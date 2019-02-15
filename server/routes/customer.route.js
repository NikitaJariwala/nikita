const {Router} = require('express');
const router = Router();
const {post, getAll, getByID, put, getbyKeyword, getByName} = require('../controllers/customer.controller');
const { generateErrorJSON } = require('../shared/common');

router.post('/', (req, res) => {
    return post(req.body, (err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.get('/' ,(req, res) => {
    return getAll((err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.get('/getByKeyword/:keyword' ,(req, res) => {
    return getbyKeyword(req.params.keyword,(err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.get('/:id', (req, res) => {
    return getByID(req.params.id, (err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.get('/getByname/:name', (req, res) => {
    return getByID(req.params.name, (err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    });
});

router.put('/update/:id', (req, res) => {
    return put(req.params.id, req.body, (err, result) => {
        if (err) {
            return res.status(400).json(generateErrorJSON(err.message, err));
        }
        else {
            return res.json(result).status(200);
        }
    })
});

module.exports = router;
