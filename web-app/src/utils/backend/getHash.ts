import crypto from 'crypto'

function createHash(url){
    url = url.toString();
    const hash = crypto.createHash('sha1').update(url).digest('hex')
    return hash
}

export default createHash;

