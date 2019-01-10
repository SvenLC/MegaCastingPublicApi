const jwt = require('jsonwebtoken');
const axios = require('axios');

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkpHcmF5IiwiaWQiOiI1MiIsImlhdCI6MTU0NzAzMjY5MiwiZXhwIjoxNTQ3MDc1ODkyfQ._6CsUUIznN5BflzT7nrVvye34FMzNvpNgLd10Aw0iUE';

exports.login = (req, res, next) => {
    const login = req.body.PAR_LOGIN;
    const password = req.body.PAR_MDP;
    let loadedUser;
    axios.get('https://megacastingprivateapi.azurewebsites.net/partenaires/findByLogin/' + login, {
            headers: {
                Authorization: token
            }
        })
        .then(result => {
            if (!result.data) {
                const error = new Error('Aucun partenaire avec ce login n\'a été trouvé');
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
            }, '8A4F212723828F68DB6B7A1072305CA4425E120815D35AC44FFC177CC890DDE1', {
                expiresIn: '24h'
            });
            res.status(200).json({
                PRO_ID: loadedUser.PRO_ID.toString(),
                PAR_TOKEN: token
            });
        })
        .catch(error => {
            if (error.message == 'Request failed with status code 404') {
                error = new Error('Aucun partenaire avec ce login n\'a été trouvé');
                error.statusCode = 401;
                
            }

            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);

        });
};