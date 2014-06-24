/*global google:true*/
/*jshint unused:false*/
/*jshint camelcase:false*/
/*jshint -W030 */

(function(){
  'use strict';

  $(document).ready(init);

  var map;

  function init(){
    initMap(36.15, -86.78, 12);
    addMarkers();
    $('#go').on('click', go);

    // LAYOUT CHANGE FOR RESPONSIVENESS
    if($(window).width() <= 769){
      $('#chatContain').insertBefore('.report');
    }

    // REGEX FILTER
    var wells = $('#report-container').find('.well-sm');
    wells.addClass('visible');
    $('#filter').keyup(function(event){
      // ESCAPE KEY CLEARS FILTER INPUT
      if (event.keyCode === 27 || $(this).val() === '') {
      $(this).val('');

      wells.removeClass('visible').show().addClass('visible');
    } else {
      filterThis(wells, $(this).val());
      }
    });
  }

  function go(){
    $('#formContain').toggleClass('hidden');
  }

  function filterThis(selector, query) {
    query =   $.trim(query);
    query = query.replace(/ /gi, '|');

    $(selector).each(function() {
      ($(this).text().search(new RegExp(query, 'i')) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
    });
  }


  function addMarkers(){
    var photos;
    var wells = $('#report-container').find('.well-sm');
    wells.each(function(){
      var well = $(this);
      var desc = well.attr('data-desc');
      var date = well.find('.date').text();
      var type = well.attr('data-type');
      var address = well.find('.address').text();
      var images = well.find('.gone');
      var imgs = $.makeArray(images);

      photos = imgs.map(function(img){
        var filepath = $(img).attr('data-img');
        var html = '<img src=' + filepath + ' class="toolPhoto">';
        return html;
      });

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

      var content = '<h4>'+date+'</h4>'+'<p>'+desc+'</p><h6>'+address+'</h6>';
      photos.forEach(p=>{
        content = p + content;
      });

      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(content);
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
