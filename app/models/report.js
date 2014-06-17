'use strict';

var reportCollection = global.nss.db.collection('reports');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class Report {
  static create(userId, obj, fn){
        var report = new Report();
        report.userId = userId;
        report.latlong = [];
        report.desc = obj.description;
        report.street = obj.streetName;
        report.save(()=>fn(report));
      }


  save(fn){
    reportCollection.save(this, ()=>fn());
  }


  static findById(id, fn){
    Base.findById(id, reportCollection, Report, fn);
  }
}

module.exports = Report;
