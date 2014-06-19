/* global io */
/*jshint unused:false*/

(function(){
  'use strict';

  $(document).ready(initialize);

  var socket;

  function initialize(){
    initializeSocketIo();
    $('#send').click(send);
  }

  function send(){
    var message = $('#message').val();
    $('#message').val('');
    socket.emit('sendmessage', {message:'hi'});
  }

  function receiveMessage(data){
    console.log(data);
    $('#chat').prepend(data.email + ' said: ' + data.message);
  }

  function initializeSocketIo(){
    socket = io.connect('/app');
    socket.on('online', online);
    socket.on('receive-message', receiveMessage);
  }

  function online(data){
    console.log(data);
    var keys = Object.keys(data);
    $('#users').empty();

    keys.forEach(k=>{
      var email = data[k].email;
      $('#users').append(`<li>${email}</li>`);
    });

  }
})();
