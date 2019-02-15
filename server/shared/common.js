const multer=require('multer');

exports.generateErrorJSON = (message, details) => {
    return {error: message, details: details};
}

exports.generateSuccessJSON = (status, data) => {
    return {status: status, data: data};
}

exports.upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/assets/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
});



