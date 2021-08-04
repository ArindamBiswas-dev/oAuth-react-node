const express = require('express');
const fetch = require('node-fetch');
const cookieSession = require('cookie-session');
var cors = require('cors');
const passport = require('passport');
const { isUserAuthenticated } = require('./auth-middleware');
require('./Passport-Config');
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret: 'heythisiscookiesecret',
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({ Home: 'Home' });
});

app.get(
  '/login/github2',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/login/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('login successful');
    // console.log(req.user);
    res.redirect('http://localhost:3000/loginsuccess');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  req.session = null;
  console.log('logout');
  res.send('logout');
});

app.get('/private', isUserAuthenticated, (req, res) => {
  res.json({ Private: 'he' });
});

app.get('/checkvaliduser', isUserAuthenticated, (req, res) => {
  console.log(`checkvaliduser : ${req.user}`);
  res.json({ user: 'username' });
});

app.get('/checkLoggedIn', isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

app.listen(8000, () => {
  console.log('server started');
});

/* 

app.use(
  cookieSession({
    secret: cookie_secret,
  })
);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/login/github', (req, res) => {
  const redirect_uri = 'http://localhost:8000/login/github/callback';
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  );
});

async function getAccessToken(code) {
  //
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });
  //   console.log(res);
  const data = await res.text();
  const params = new URLSearchParams(data);
  return params.get('access_token');
}

async function getGithubUser(access_token) {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();
  return data;
}

app.get('/login/github/callback', async (req, res) => {
  const code = req.query.code;
  //   console.log(code);
  const token = await getAccessToken(code);
  const gitHubUserData = await getGithubUser(token);
  console.log(gitHubUserData);
  if (gitHubUserData) {
    req.session.gitHubId = gitHubUserData.id;
    req.session.token = token;
  }
  res.json({ gitHubUserData });
  // res.redirect('/admin');
  //   res.json({ token });  https://avatars.githubusercontent.com/u/69881224?v=4
});

app.get('/admin', (req, res) => {
  const id = req.session.gitHubId;
  res.json({ id });
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


*/
