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
    socket.emit('sendmessage', {message:message});
  }

  function receiveMessage(data){
    $('#chat').append($('<div class="message">' +data.email+ ' said: ' +data.message+ '</div>'));
  }

  function initializeSocketIo(){
    socket = io.connect('/app');
    socket.on('online', online);
    socket.on('receive-message', receiveMessage);
  }

  function online(data){
    var keys = Object.keys(data);
    $('#users').empty();

    keys.forEach(k=>{
      var email = data[k].email;
      $('#users').append(`<li>${email}</li>`);
    });

  }
})();
