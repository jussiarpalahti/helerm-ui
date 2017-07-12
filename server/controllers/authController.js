import { Passport } from 'passport';
import HelsinkiStrategy from 'passport-helsinki';
import _debug from 'debug';
const debug = _debug('app:auth');

import config from '../../config';

const helsinkiStrategy = new HelsinkiStrategy({
  clientID: config.globals.CLIENT_ID,
  clientSecret: config.globals.CLIENT_SECRET,
  callbackURL: `${config.globals.APP_URL}/auth/login/helsinki/return`,
  authorizationURL: 'https://api.hel.fi/sso-test/oauth2/authorize/',
  tokenURL: 'https://api.hel.fi/sso-test/oauth2/token/',
  userProfileURL: 'https://api.hel.fi/sso-test/user/',
  appTokenURL: 'https://api.hel.fi/sso-test/jwt-token/'
}, (accessToken, refreshToken, profile, done) => {
  debug('PROFILE ', profile);
  debug('access token:', accessToken);
  debug('refresh token:', refreshToken);
  debug('acquiring token from api...');
  helsinkiStrategy.getAPIToken(accessToken, config.globals.CLIENT_AUDIENCE, (token, expiresAt) => {
    profile.token = token;
    profile.expiresAt = expiresAt;
    debug('EXPIRES?', profile);
    return done(null, profile);
  });
});

const passport = new Passport();
passport.use(helsinkiStrategy);

passport.serializeUser((user, done) => {
  debug('serializing user:', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  debug('deserializing user:', user);
  done(null, user);
});

/**
 * Successfull auth callback
 * @param req
 * @param res
 */
function authCallback (req, res) {
  debug('Authcallback');
  // const js = `
  //   setTimeout(function(){
  //     try{
  //       window.close();
  //     } catch(e) {
  //       location.href = "/";
  //     }
  //   }, 300);
  // `;
  // const html = `<html><body>Login successful.<script>${js}</script>`;
  // res.send(html);
  const redirectUrl = req.query.next || `${config.globals.APP_URL}`;
  res.redirect(redirectUrl);
}

/**
 * Get current logged in user
 * @param req
 * @param res
 */
function getCurrentUser (req, res) {
  debug('CurrentUser');
  res.json(req.user || {});
}

/**
 * Logout
 * @param req
 * @param res
 */
function logOut (req, res) {
  req.logout();
  const redirectUrl = req.query.next || `${config.globals.APP_URL}`;
  res.redirect(`https://api.hel.fi/sso-test/logout/?next=${redirectUrl}`);
}

export default { passport, authCallback, getCurrentUser, logOut };
