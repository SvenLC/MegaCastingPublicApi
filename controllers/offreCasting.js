const axios = require('axios');

exports.getOffreCastings = (req, res, next) => {
    axios.get('https://megacastingprivateapi.azurewebsites.net/offreCastings/formated')
    .then(offres => {        
        res.status(200).json(offres.data.Offre);       
        
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

exports.getOffreCastingsById = (req, res, next) => {
    const { id } = req.params;
    axios.get('https://megacastingprivateapi.azurewebsites.net/offreCastings/formated/' + id )
    .then(result => {
        res.status(200).json(result.data.Offre);
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}