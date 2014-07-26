'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../../app/models/user.js');
var reportCollection = global.nss.db.collection('reports');
var Report = traceur.require(__dirname + '/../models/report.js');
var Base = traceur.require(__dirname + '/../models/base.js');

exports.registration = (req, res)=>{
  if(!req.user){
    res.render('users/register', {title: 'Registration', message: req.flash('registerMessage')});
  } else {
    res.redirect('/');
  }
};

exports.logout = (req, res)=>{
  req.logout();
  res.redirect('/');
};

exports.bounce = (req, res, next)=>{
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

exports.profile = (req, res)=>{
  Base.findAll(reportCollection, Report, reports=>{
    res.render('users/profile', {user: req.user, reports:reports, title: 'Map'});
  });
};

exports.password = (req, res)=>{
  res.render('users/password', {message: req.flash('passwordMessage'), title: 'Change Password'});
};

exports.updatePassword = (req, res)=>{
  User.findById(req.user._id, (err, user)=>{
    user.changePassword(req.body, (err)=>{
      if(err){
        req.flash('passwordMessage', 'Current password is incorrect. Please try again.');
        res.redirect('/users/password');
      }else{
        user.save(()=>{res.redirect('/profile');});
      }
    });
  });
};
