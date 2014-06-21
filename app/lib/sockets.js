'use strict';

var Cookies = require('cookies');
var traceur = require('traceur');
var userCollection;
var User;
var Base;
var users = {};

exports.connection = function(socket){
  if(global.nss){
    User = traceur.require(__dirname + '/../models/user.js');
    userCollection = global.nss.db.collection('users');
    Base = traceur.require(__dirname + '/../models/base.js');
    addUserToSocket(socket);
    socket.on('sendmessage', sendMessage);
  }
};

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

function sendMessage(data){
  var socket = this;
  if(socket.nss.user.local){
    data.email = socket.nss.user.local.email;
  }
  if(socket.nss.user.facebook.email){
    data.email = socket.nss.user.facebook.email;
  }

  socket.broadcast.emit('receive-message', data);
  socket.emit('receive-message', data);
}

function addUserToSocket(socket){
  var cookies = new Cookies(socket.handshake, {}, ['SEC123', '321CES']);
  var encoded = cookies.get('express:sess');
  var decoded;

  if(encoded){
    decoded = decode(encoded);
  }

  Base.findById(decoded.passport.user, userCollection, User, (err, user)=>{

    users[decoded.passport.user] = user;
    socket.nss = {};
    socket.nss.user = user;
    socket.emit('online', users);
    socket.broadcast.emit('online', users);
  });
}

function decode(string) {
  var body = new Buffer(string, 'base64').toString('utf8');
  return JSON.parse(body);
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
