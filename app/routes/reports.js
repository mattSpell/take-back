'use strict';

var multiparty = require('multiparty');
var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Report = traceur.require(__dirname + '/../models/report.js');
var Base = traceur.require(__dirname + '/../models/base.js');
var request = require('request');

exports.create = (req, res)=>{
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files)=>{
    Report.create(req.user._id, fields, files, (report)=>{
      var street = report.street.split(' ').map(each=>each.trim());
      var first = street[0] || '';
      var second = street[1] || '';
      var third = street[2] || '';
      var fourth = street[3] || '';

      request('https://maps.googleapis.com/maps/api/geocode/json?address='+first+'+'+second+'+'+third+'+'+fourth+'+,+Nashville,+TN&key=AIzaSyCCisv6D7SOLh8w4s58alflk1tk9qlCFQ0', function(err, response, body){
      if(!err && response.statusCode === 200){
        body = JSON.parse(body);
        var lat = body.results[0].geometry.location.lat;
  		  var long = body.results[0].geometry.location.lng;
        report.latlong.push(lat, long);
        report.save((report)=>{
          res.redirect('/profile');
          });
        }
      });
    });
  });
};

exports.destroy = (req, res)=>{
  Base.findById(req.params.id, reportCollection, Report, (err, report)=>{
    report.destroy(()=>res.redirect('/profile'));
  });
};
