import jwt from 'jsonwebtoken';

import Token from '../models/token';

const specialKey = 'Shreejit';
const specialKey2 = 'hello';

export function createToken(type, userid) {
  switch (type) {
    case 'refresh': {
      let token = new Promise((resolve, reject) => {
        jwt.sign({ userid }, specialKey2, { expiresIn: '60s' }, (err, refreshToken) => {
          if (err) {
            reject('error');
          }
          let timeStamp = Math.round(new Date().getTime() / 1000) + 3600;
          new Token({ userid, ref_Token: refreshToken, exp_Time: timeStamp }).save();
          resolve(refreshToken);
        });
      });
      return token;
    }
    case 'access': {
      let token = new Promise((resolve, reject) => {
        jwt.sign({ userid }, specialKey, { expiresIn: '10s' }, (err, accessToken) => {
          if (err) {
            reject('error');
          }
          resolve(accessToken);
        });
      });
      return token;
    }
    default: {
      return 'err';
    }
  }
}

export function getToken(token) {
  return Token.where({ ref_Token: token })
    .fetch()
    .then(data => {
      if (!data) {
        throw Boom.notFound('User not found');
      }
      return data;
    });
}
