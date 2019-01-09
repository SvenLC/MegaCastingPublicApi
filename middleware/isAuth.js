const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    const domain = 'https://megacastingwebsite.herokuapp.com';
    const local = 'http://localhost:4000';
    const url = req.get('Origin');
    const secret = '8A4F212723828F68DB6B7A1072305CA4425E120815D35AC44FFC177CC890DDE1';

    if (url == domain || url == local) {

        next();

    } else {

        if (!autHeader) {
            const error = new Error('Non authentifié');
            error.statusCode = 401;
            throw error;
        }
        const token = autHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secret);
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
        if (!decodedToken) {
            const error = new Error('Non authentifié');
            error.statusCode = 401;
            throw error;
        }
        req.userId = decodedToken.userId;
        next();
    }

};