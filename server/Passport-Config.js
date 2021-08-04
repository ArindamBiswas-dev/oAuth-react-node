const passport = require('passport');
const GitHubStrategy = require('passport-github2');

// const client_id = 'Iv1.f7598f9a5a71d704';
// const client_secret = 'a2575dab11a346c03042c0ffb576618f27eb5c6f';
const cookie_secret = 'heythisiscookiesecret';

passport.use(
  new GitHubStrategy(
    {
      clientID: 'Iv1.f7598f9a5a71d704',
      clientSecret: 'a2575dab11a346c03042c0ffb576618f27eb5c6f',
      callbackURL: 'http://localhost:8000/login/github/callback',
    },
    async (req, accesToken, refreshToken, profile, cb) => {
      // console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  //   console.log('serialize : ' + user);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  //   console.log('deserialize : ' + id);
  try {
    cb(null, id);
  } catch (err) {
    // console.log('err');
  }
});
