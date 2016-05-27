'use strict';

// node moduels
// npm moduels
const co = require('co');
const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const debug = require('debug')('list:list-router');

// app moduels
const AppErr = require('../lib/app-err');
const listCrud = require('../lib/list-crud');
const noteCrud = require('../lib/note-crud');
const parseQuery = require('../lib/parse-query');

// globals -- module
const listRouter = module.exports = new Router();

listRouter.post('/', bodyParser, function(req, res) {
  debug('POST route /api/list');
  co((function* (){
    const list = yield listCrud.createList(req.body);
    res.json(list);
  }).bind(this)).catch((err) => {
    res.sendErr(err);
  });
});

listRouter.get('/:id', function(req, res) {
  debug('GET route /api/list/:id ');
  co((function* (){
    const list = yield listCrud.fetchList(req.params.id);
    res.json(list);
  }).bind(this)).catch((err) => {
    res.sendErr(err);
  });
});

listRouter.put('/:id',bodyParser,function(req, res) {
  debug('GET route /api/list/:id ');
  co((function* (){
    yield listCrud.updateList(req.params.id, req.body);
    const list = yield listCrud.fetchList(req.params.id);
    res.json(list);
  }).bind(this)).catch((err) => {
    res.sendErr(err);
  });
});

listRouter.delete('/:id',bodyParser,function(req, res) {
  debug('GET route /api/list/:id ');
  co((function* (){
    const list = yield listCrud.deleteList(req.params.id);
    res.json(list);
  }).bind(this)).catch((err) => {
    res.sendErr(err);
  });
});

listRouter.get('/:id/notes', parseQuery, function(req, res){
  debug('GET route /api/list/:id/notes');
  co((function* (){
    console.log('req.query', req.query);
    const notes = yield noteCrud.fetchListNotes(req.params.id, req.query.limit);
    return res.json(notes);
  }).bind(this)).catch((err) => {
    res.sendErr(err);
  });
});
