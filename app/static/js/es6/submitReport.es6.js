/*global google:true, addMarkers*/
/*jshint unused:false*/
/*jshint camelcase:false*/

(function(){
  'use strict';

    $(document).ready(function() {
      $('#submit').click(function(event){
        // $('#map').empty();
        // addMarkers();
        event.preventDefault();
          $.ajax({
              type: 'POST',
              url: '/reports',
              data: $('form.report').serialize(),
              dataType: 'html',
              success: html=>{
                location.reload();
                  console.log(html);
                }
            });
        });
    });




})();
