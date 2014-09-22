/* global describe, before, beforeEach, it */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'take-back-test';

var expect = require('chai').expect;
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
// var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var app = require('../../../app/app');
var request = require('supertest');

var Report;

describe('reports', function(){

  before(function(done){
    db(function(){
      Report = traceur.require(__dirname + '/../../../app/models/report.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      Report.create('53a0c3c135451bfc446534e8',
      {'userId': '53a0c3c135451bfc446534e8',
      'type': ['assault'], 'description': ['Test'],
      'streetName': ['123 MAIN STREET'], 'city': ['Nashville'],
      'state': ['TN'], 'zip': ['37211'], 'date': ['06/12/2014']}, function(report){
        done();
      });
    });
  });

  describe('GET /', function(){
    it('should show the home page', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });


});
