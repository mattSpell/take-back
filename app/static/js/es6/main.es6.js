/*global google:true*/
/*jshint unused:false*/
/*jshint camelcase:false*/

(function(){
  'use strict';

  $(document).ready(init);

  var map;

  function init(){
    initMap(36.15, -86.78, 12);
    addMarkers();

    if($(window).width() <= 769){
      $('#chatContain').insertBefore('.report');
    }

  }

  function addMarkers(){
    var wells = $('#report-container').find('.well-sm');
    wells.each(function(){
      var desc = $(this).find('.content').text();
      var date = $(this).find('.date').text();
      var type = $(this).attr('data-type');
      var icon = `../img/${type}.png`;
      var lat = $(this).attr('data-lat');
      var long = $(this).attr('data-long');
      var point = new google.maps.LatLng(parseFloat(lat),parseFloat(long));
      // map.bounds.extend(point);
      var marker = new google.maps.Marker({
        position: point,
        icon: icon,
        map: map
      });

      var infoWindow = new google.maps.InfoWindow();
      var html = '<h4>'+date+'</h4>'+'<p>'+desc+'</p>';
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    });
  }



  function initMap(lat, lng, zoom){
    let styles = [{'elementType':'geometry','stylers':[{'hue':'#ff4400'},{'saturation':-68},{'lightness':-4},{'gamma':0.72}]},{'featureType':'road','elementType':'labels.icon'},{'featureType':'landscape.man_made','elementType':'geometry','stylers':[{'hue':'#0077ff'},{'gamma':3.1}]},{'featureType':'water','stylers':[{'hue':'#00ccff'},{'gamma':0.44},{'saturation':-33}]},{'featureType':'poi.park','stylers':[{'hue':'#44ff00'},{'saturation':-23}]},{'featureType':'water','elementType':'labels.text.fill','stylers':[{'hue':'#007fff'},{'gamma':0.77},{'saturation':65},{'lightness':99}]},{'featureType':'water','elementType':'labels.text.stroke','stylers':[{'gamma':0.11},{'weight':5.6},{'saturation':99},{'hue':'#0091ff'},{'lightness':-86}]},{'featureType':'transit.line','elementType':'geometry','stylers':[{'lightness':-48},{'hue':'#ff5e00'},{'gamma':1.2},{'saturation':-23}]},{'featureType':'transit','elementType':'labels.text.stroke','stylers':[{'saturation':-64},{'hue':'#ff9100'},{'lightness':16},{'gamma':0.47},{'weight':2.7}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }


})();
