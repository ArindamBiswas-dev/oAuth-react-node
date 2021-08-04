module.exports.isUserAuthenticated = (req, res, next) => {
  //   console.log('with in isUserAuth');
  if (req.user) {
    // check: at database is the user exists or not
    next();
  } else res.status(401).send('You are not authorize');
};
