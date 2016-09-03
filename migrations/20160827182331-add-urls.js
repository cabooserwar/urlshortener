'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('urls', {
    url_id: { type: 'int', primaryKey: true, notNull: true, autoIncrement: true },
    long_url: { type: 'text', unique: true},
    created_at: 'date',

  }, callback);
  callback();
};

exports.down = function(db, callback) {
  db.dropTable('urls', callback);
  callback();
};
