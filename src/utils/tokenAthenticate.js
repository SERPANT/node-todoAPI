import jwt from 'jsonwebtoken';

import * as tokenService from '../services/tokenService';

const accspecialKey = 'Shreejit';
const refspecialKey = 'Rose';

export function accToken(req, res, next) {
  jwt.verify(req.token, accspecialKey, (err, authData) => {
    if (err) {
      let err = new Error();
      err.message = 'token not valid';
      err.status = 401;
      res.status(401).json(err);
    } else {
      req.authData = authData;
      next();
    }
  });
}

export function refToken(req, res, next) {
  jwt.verify(req.token, refspecialKey, (err, authData) => {
    if (err) {
      let err = new Error();
      err.message = 'Forbidden';
      err.status = 403;
      res.status(403).json({ err });
    } else {
      tokenService.getToken(req.token).then(data => {
        let currentTime = new Date().getTime() / 1000;
        let tokenTime = data.attributes.exp_Time;
        if (tokenTime - currentTime >= 0) {
          req.authData = authData;
          next();
        } else {
          let err = new Error();
          err.message = 'token problem';
          err.status = 404;
          res.status(404).json({ err });
        }
      });
    }
  });
}
