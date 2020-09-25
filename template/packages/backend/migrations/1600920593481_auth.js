/* eslint-disable camelcase */

const {PgLiteral} = require('node-pg-migrate');

exports.shorthands = {
  createdAt: {type: 'timestamp', notNull: true, default: new PgLiteral('current_timestamp')},
};

exports.up = (pgm) => {
  pgm.createTable('auth', {
    id: {type: 'text', notNull: true, primaryKey: true},
    password_digest: {type: 'bytea', notNull: true},
    createdAt: 'createdAt',
  });
  pgm.createTable('key_value', {
    key: {type: 'text', notNull: true, primaryKey: true},
    value: {type: 'jsonb', notNull: true},
  });
};

exports.down = (pgm) => {
  pgm.dropTable('auth');
  pgm.dropTable('key_value');
};
