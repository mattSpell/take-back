/* jshint unused:false */
'use strict';

var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var request = require('request');
var userCollection = global.nss.db.collection('users');
var User = traceur.require(__dirname + '/../models/user.js');

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
          Base.findById(userId, userCollection, User, (err, user)=>{
            sendReportEmail(report, user, fn);
          });
        });
      }


  save(fn){
    reportCollection.save(this, ()=>fn(this));
  }


  static findById(id, fn){
    Base.findById(id, reportCollection, Report, fn);
  }
}

  function sendReportEmail(report, user, fn){
    var key = process.env.MAILGUN;
    var url = 'https://api:' + key + '@api.mailgun.net/v2/sandboxe9429ffb39cf46ae8647ff7eb786e9a2.mailgun.org/messages';
    var post = request.post(url, function(err, response, body){
      // fn(err, body);

      fn(report);
    });

    var form = post.form();
    form.append('from', 'admin@take-back-nash.com');
    form.append('to', 'matthew.spell1@gmail.com');
    form.append('subject', 'A crime/suspicious activity report was created on Take-Back-Nash.com');
    if(user.facebook.displayName){
      form.append('html', `<h2>${report.date}</h2><p>${report.desc}</p>
                            <p>Submitted by:</p>
                            <p>${user.facebook.displayName}</p>
                            <p>${user.facebook.email}</p>`);}
    if(user.local.email){
      form.append('html', `<h2>${report.date}</h2><p>${report.desc}</p>
                            <p>Submitted by:</p>
                            <p>${user.local.email}</p>`
                            );}

  }

module.exports = Report;
