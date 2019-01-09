const axios = require('axios');
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkpHcmF5IiwiaWQiOiI1MiIsImlhdCI6MTU0NzAzMjY5MiwiZXhwIjoxNTQ3MDc1ODkyfQ._6CsUUIznN5BflzT7nrVvye34FMzNvpNgLd10Aw0iUE';

exports.getOffreCastings = (req, res, next) => {
    axios.get('https://megacastingprivateapi.azurewebsites.net/offreCastings/formated', { headers: { Authorization: token}})
    .then(offres => {        
        res.status(200).json(offres.data.Offres);       
        
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
    axios.get('https://megacastingprivateapi.azurewebsites.net/offreCastings/formated/' + id, { headers: { Authorization: token}} )
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