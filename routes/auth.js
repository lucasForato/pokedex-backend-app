const jwt = require('jsonwebtoken');

async function validate (req, res, next) {
    const { authorization } = req.headers;

    if( !authorization ) return res.sendStatus(401);
    const token = authorization && authorization.split(' ')[1];
    


    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        console.log('everythng alright')
        return next();
  })
}

module.exports = validate;