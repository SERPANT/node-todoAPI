import HttpStatus from 'http-status-codes';

import * as tokenService from '../services/tokenService';

export function createAccessToken(req, res, next) {
  tokenService.createToken('access', req.authData.userid).then(acctoken => {
    res.status(HttpStatus.CREATED).json({ acctoken });
  });
}

export function createRefreshToken(req, res, next) {
  tokenService.createToken('refresh', req.user.attributes.id).then(reftoken => {
    res.status(HttpStatus.CREATED).json({ reftoken });
  });
}
