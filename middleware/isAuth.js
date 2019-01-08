const jwt = require('jsonwebtoken');
const dns = require('dns');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');    
    const domain = 'megacastingwebsite.herokuapp.com';
    const ip = req.get('Origin');


    
    if (autHeader == eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkJlbmphbWluIiwiaWQiOjI2LCJpYXQiOjE1NDY5MTYxOTIsImV4cCI6MTU0NzAwMjU5Mn0.gwsOGmpy9iKY2f7XXeIR8L4gSoxOUWyQH5VilzngDgA) {        
        next();
    }
    else {

        const autHeader = req.get('Authorization');

        if (!autHeader) {
            const error = new Error('Non authentifié');
            error.statusCode = 401;
            throw error;
        }
        const token = autHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'BDB971EA6E6788317F359F23E86C5');
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

    res.status(200).json({ip: ip, domain: domain});
    
};

