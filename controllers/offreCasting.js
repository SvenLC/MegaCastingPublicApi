const axios = require('axios');

exports.getOffreCastings = (req, res, next) => {
    axios.get('http://localhost:3000/offreCastings/formated')
    .then(offres => {
        console.log(offres.data);
        res.status(200).json({offres: offres.data});
        
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}