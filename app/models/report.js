/* jshint unused:false */
'use strict';

var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

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
        report.save(()=>fn(report));
      }


  save(fn){
    reportCollection.save(this, ()=>fn(this));
  }


  static findById(id, fn){
    Base.findById(id, reportCollection, Report, fn);
  }
}

module.exports = Report;
