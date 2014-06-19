/* jshint unused:false */
'use strict';

var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var request = require('request');

class Report {
  static create(userId, obj, fn){
        var report = new Report();
        report.userId = userId;
        report.latlong = [];
        report.type = obj.type;
        report.desc = obj.description;
        report.street = obj.streetName;

        var roughDate = new Date(obj.date);
        var day = roughDate.getDate();
        var month = roughDate.getMonth();
        var year = roughDate.getFullYear();
        report.date = `${month}/${day}/${year}`;
        report.save(()=>{
          sendReportEmail(report, fn);
        });
      }


  save(fn){
    reportCollection.save(this, ()=>fn(this));
  }


  static findById(id, fn){
    Base.findById(id, reportCollection, Report, fn);
  }

}

  function sendReportEmail(report, fn){
    var key = process.env.MAILGUN;
    var url = 'https://api:' + key + '@api.mailgun.net/v2/sandboxe9429ffb39cf46ae8647ff7eb786e9a2.mailgun.org/messages';
    var post = request.post(url, function(err, response, body){
      // fn(err, body);

      fn(report);
    });

    var form = post.form();
    form.append('from', 'admin@take-back-nash.com');
    form.append('to', 'matthew.spell1@gmail.com');
    form.append('subject', 'There has been a crime reported on Take-Back-Nash.com');
    form.append('html', `<h2>${report.date}</h2><p>${report.desc}</p>`);

  }

module.exports = Report;
