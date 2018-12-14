function tokenExtractor(req, res, next) {
  let token = req.get('Authorization');
  if (token) {
    req.token = token;
    next();
  } else {
    let err = new Error();
    err.message = 'Forbidden';
    err.status = 403;
    res.status(403).json(err);
  }
}

export default tokenExtractor;
