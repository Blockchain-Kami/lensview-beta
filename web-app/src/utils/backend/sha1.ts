import crypto from 'crypto';

export const createHash = (url: string) => {
    const hash = crypto.createHash('sha1').update(JSON.stringify(url)).digest('hex')
    return hash
}



