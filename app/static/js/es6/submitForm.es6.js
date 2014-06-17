/*global google:true*/
/*jshint unused:false*/
/*jshint camelcase:false*/

(function(){
  'use strict';

    $(document).ready(function() {
      $('#submit').on('click', function(){
          $.ajax({
              type: 'POST',
              url: '/reports', //process to mail
              data: $('form.report').serialize(),
              success: function(html){
                  console.log(html);
                }
            });
        });
    });



})();
