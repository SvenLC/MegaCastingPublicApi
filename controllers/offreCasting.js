const axios = require('axios');

exports.getOffreCastings = (req, res, next) => {
    axios.get('https://megacastingprivateapi.azurewebsites.net/offreCastings/formated')
    .then(offres => {        
        res.status(200).json({offres: offres.data});       
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}