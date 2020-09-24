/* eslint-disable camelcase */

const {PgLiteral} = require('node-pg-migrate');

exports.shorthands = {
  createdAt: {type: 'timestamp', notNull: true, default: new PgLiteral('current_timestamp')},
};

exports.up = (pgm) => {
  pgm.createTable('auth', {
    id: {type: 'text', notNull: true},
    passwordDigest: {type: 'bytea', notNull: true},
    createdAt: 'createdAt',
  });
  pgm.createTable('keyValue', {
    key: {type: 'text', notNull: true},
    value: {type: 'jsonb', notNull: true},
  });
};

exports.down = (pgm) => {
  pgm.dropTable('auth');
  pgm.dropTable('keyValue');
};
