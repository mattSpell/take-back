'use strict';

// var multiparty = require('multiparty');
// var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Report = traceur.require(__dirname + '/../models/report.js');
var request = require('request');

exports.create = (req, res)=>{
  Report.create(req.user._id, req.body, (report)=>{
    var street = req.body.streetName.split(' ').map(each=>each.trim());
    request('https://maps.googleapis.com/maps/api/geocode/json?address='+street[0]+'+'+street[1]+'+'+street[2]+',+Nashville,+TN&key=AIzaSyCCisv6D7SOLh8w4s58alflk1tk9qlCFQ0', function(err, response, body){
    if(!err && response.statusCode === 200){
      body = JSON.parse(body);
      var lat = body.results[0].geometry.location.lat;
		  var long = body.results[0].geometry.location.lng;
      report.latlong.push(lat, long);
      report.save((report)=>{
        res.render('users/report', {report:report});
        });
      }
    });
  });
};
