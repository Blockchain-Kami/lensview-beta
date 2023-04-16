const crypto = require('crypto')

function createHash(url){
    const hash = crypto.createHash('sha1').update(JSON.stringify(url)).digest('hex')
    return hash
}

module.exports = {createHash}

