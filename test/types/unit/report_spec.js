/*global describe, it, before, beforeEach*/
/*jshint expr:true*/
'use strict';

process.env.DBNAME = 'take-back-test';

var expect = require('chai').expect;
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var Report;
var Base;


describe('Report', function(){
  before(function(done){
    db(function(){
      Base = traceur.require(__dirname + '/../../../app/models/base.js');
      Report = traceur.require(__dirname + '/../../../app/models/report.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('reports').drop(function(){
      Report.create('53a0c3c135451bfc446534e8',
      {'userId': '53a0c3c135451bfc446534e8',
      'type': ['assault'], 'description': ['Test'],
      'streetName': ['123 MAIN STREET'], 'city': ['Nashville'],
      'state': ['TN'], 'zip': ['37211'], 'date': ['06/12/2014']}, function(report){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a report', function(done){
      Report.create('53a0c3c135451bfc446534e8',
      {'_id':'1a23456789abcdef01234568', 'userId': '53dd5088986574be5f8b2476',
      'type': ['assault'], 'desc': ['TESTING'], 'street': ['555 MAIN STREET'],
      'city': ['Nashville'], 'state': ['TN'], 'zip': ['37211'],
      'date': ['06/12/2014']}, function(report){
        expect(report).to.be.instanceof(Report);
        expect(report.latlong).to.have.length(0);
        expect(report.type).to.equal('assault');
        expect(report.desc).to.equal('Test');
        expect(report.street).to.equal('123 Main Street');
        expect(report.city).to.equal('Nashville');
        expect(report.state).to.equal('TN');
        expect(report.zip).to.equal('37211');
        expect(report.date).to.equal('06/12/2014');
        done();
      });
    });
  });

  describe('.findById', function () {
    it('should return the correct report', function (done) {
      Report.findById('1a23456789abcdef01234568', function (report) {
        expect(report).to.be.ok;
        expect(report).to.be.instanceof(Report);
        expect(report.desc).to.equal('TESTING');
        done();
      });
    });
    it('should return null - no such id', function(done){
      Report.findById('abc3456789abcdef01234568', function(report){
        expect(report).to.be.null;
        done();
      });
    });
  });

  describe('#destroy', function(){
    it('should successfully delete a report', function(done){
      Report.findById('1a23456789abcdef01234568', function(err, report){
        Report.destroy(function(){
          Report.findById('1a23456789abcdef01234568', function(err, r){
            expect(r).to.equal(null);
            done();
          });
        });
      });
    });
  });


});
