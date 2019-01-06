const mcache = require('memory-cache');

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.status(200).json(cachedBody)
            return
        } else {
            res.sendResponse = res.json
            res.json = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

module.exports = cache