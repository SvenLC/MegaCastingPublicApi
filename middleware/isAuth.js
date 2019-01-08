const jwt = require('jsonwebtoken');
const dns = require('dns');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    const domain = 'megacastingwebsite.herokuapp.com';
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipWP = ip.split(':')[0];
    let ipWebSite;      
    
    dns.lookup('megacastingwebsite.herokuapp.com', (err, adresse) => {
        ipWebSite = adresse;
        //res.status(200).json({ipWP: ipWP, ipWebSite: ipWebSite});
        
    }) 
    
    if (ipWP == ipWebSite) {        
        next();
    }
    else {
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
    
};

