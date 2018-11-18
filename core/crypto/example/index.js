const crypto = require('crypto')

const cipher = crypto.createCipher('aes256', 'secret key')

let encrypted = cipher.update('encrypted ', 'utf8', 'hex')
encrypted += cipher.update('message', 'utf8', 'hex')

encrypted += cipher.final('hex')

console.log('encrypted: ', encrypted)

const decipher = crypto.createDecipher('aes256', 'secret key')

let decrypted = decipher.update(encrypted.substring(0, 10), 'hex', 'utf8')
decrypted += decipher.update(encrypted.substring(10), 'hex', 'utf8')

decrypted += decipher.final('utf8')

console.log('decrypted: ', decrypted)

// var crypto = require('crypto');
// var ecr = function(str)
// {
//     var cipher = crypto.createCipher('aes256', 'passphase');
//     var cryptedBuffers = [cipher.update(new Buffer(str))];
//     cryptedBuffers.push(cipher.final());
//     var crypted = Buffer.concat(cryptedBuffers);
//     return crypted;
// };
// var dcr = function(str)
// {
//     var dcipher = crypto.createDecipher('aes256', 'passphase');

//     var dcryptedBuffers = [dcipher.update(new Buffer(str))];
//     dcryptedBuffers.push(dcipher.final());
//     var dcrypted = Buffer.concat(dcryptedBuffers)
//         .toString('utf8');
//     return dcrypted;
// };

// console.log(ecr('hello test').toStri··ng('hex'));
// console.log(dcr(ecr('hello test')));