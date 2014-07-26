'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var reports = traceur.require(__dirname + '/../routes/reports.js');

  /* Passport Configuration */
  var passport = require('passport');
  require('../config/passport')(passport);
  app.get('/', dbg, home.index);
  app.get('/register', dbg, users.registration);
  app.post('/register', dbg, passport.authenticate('local-register', {
    successRedirect : '/profile',
    failureRedirect : '/register',
    failureFlash : true
  }));
  app.post('/login', dbg, passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true
  }));
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  })); // facebook does not provide email by default. Must add scope.
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

	// locally --------------------------------
	app.get('/connect/local', function(req, res) {
		res.render('users/connect-local', { message: req.flash('registerMessage') });
	});
	app.post('/connect/local', passport.authenticate('local-register', {
		successRedirect : '/profile',
		failureRedirect : '/connect/local',
		failureFlash : true
	}));

	// facebook -------------------------------
	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

  // UNLINK ACCOUNTS =============================================================
  // local -----------------------------------
  app.get('/unlink/local', function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) {
      var user            = req.user;
      user.facebook.token = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) {
      var user           = req.user;
      user.twitter.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
  });

  app.all('*', users.bounce);
  app.get('/profile', dbg, users.profile);
  app.post('/logout', dbg, users.logout);
  app.get('/users/password', dbg, users.password);
  app.post('/users/password', dbg, users.updatePassword);
  app.post('/reports/:id', dbg, reports.destroy);
  app.post('/reports', dbg, reports.create);

  console.log('Routes Loaded');
  fn();
}
