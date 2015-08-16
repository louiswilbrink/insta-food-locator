var http          = require('http');
var express       = require('express');
var app           = express();
var instagram     = require('instagram-node').instagram();
var session       = require('client-sessions');
var config        = require('./env.js');

// Eventually, check environment variables and build config.  Putting all in 'base' for now.
config = config.base;

instagram.use({
    client_id: config['INSTAGRAM_CLIENT_ID'],
    client_secret: config['INSTAGRAM_CLIENT_SECRET']
});

app.use(session({
  cookieName: config['SESSION_NAME'], // instagram food locator session.
  secret: config['SESSION_SECRET'],
  duration: config['SESSION_DURATION'],
  activeDuration: config['SESSION_ACTIVE_DURATION']
}));

app.use(express.static('src/app'));

function requireLogin (req, res, next) {
    console.log('checking login..');
    if (req[config['SESSION_NAME']] && req[config['SESSION_NAME']].username) {
        console.log('user is logged in:', req[config['SESSION_NAME']].username);
        next();
    }
    else {
        console.log('no session found, getting code');

        // After authorization, instagram will redirect to /auth.
        res.redirect(instagram.get_authorization_url(config['INSTAGRAM_REDIRECT_URI'], { scope: ['likes'], state: 'a state' }));
    }
}

app.get('/auth', function (req, res) {
  console.log('/auth');
  instagram.authorize_user(req.query.code, config['INSTAGRAM_REDIRECT_URI'], function(err, result) {
    if (err) {
      console.log('err', err.body);
      res.send("Didn't work");
    } 
    else {
      console.log('logged into instagram:', result.user.full_name);
      req[config['SESSION_NAME']].username = result.user.username;
      console.log('session:', req[config['SESSION_NAME']]);
      res.redirect('/*');
    }
  });
});

app.get('/*', requireLogin, function (req, res) {

    console.log('/*');
    var options = {
        root: __dirname + '/src/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile('index.html', options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});

app.listen(8181, '127.0.0.1');
console.log('Listening on 8181');
