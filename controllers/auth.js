const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.login = (req, res, next) => {    
    const login = req.body.PAR_LOGIN;
    const password = req.body.PAR_MDP;
    let loadedUser;    
    axios.get('https://megacastingprivateapi.azurewebsites.net/partenaires/findByLogin/' + login)
        .then(result => {            
            if (!result) {
                const error = new error('Aucun partenaire avec ce login n\'a été trouvé');
                error.statusCode = 401;
                throw error;                
            }            
            loadedUser = result.data;
            return password == result.data.PAR_MDP;
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Mot de passe incorrect');
                error.statusCode = 401;
                throw error;
            }
            console.log(loadedUser);
            const token = jwt.sign({
                login: loadedUser.PAR_LOGIN,
                id: loadedUser.PRO_ID
            }, 'BDB971EA6E6788317F359F23E86C5',
                { expiresIn: '24h' }
            );
            res.status(200).json({ PRO_ID: loadedUser.PRO_ID.toString(), PAR_TOKEN: token });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);

        });
};

console.log(req.headers.host);