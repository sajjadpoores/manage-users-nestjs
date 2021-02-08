'use strict';
const Service = require('moleculer').Service;

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

export class usersServiceMoleculer extends Service {
  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: 'users',
      mixins: [DbService],
      adapter: new MongooseAdapter(
        'mongodb://localhost:27017/microservice_users',
      ),
      model: mongoose.model(
        'User',
        mongoose.Schema({
          name: {
            type: String,
            minlength: 3,
            maxlength: 100,
            required: true,
          },
          email: {
            type: String,
            minlength: 3,
            maxlength: 320,
            required: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            index: { unique: true, dropDups: true },
          },
          username: {
            type: String,
            minlength: 3,
            maxlength: 20,
            required: true,
            index: { unique: true, dropDups: true },
          },
          password: {
            type: String,
            minlength: 6,
            maxlength: 60,
            required: true,
          },
        }),
      ),
      afterConnected() {
        this.logger.info('Connected successfully');
      },
      entityCreated(json, ctx) {
        this.logger.info('New entity created!');
      },

      entityUpdated(json, ctx) {
        this.logger.info(`Entity updated`);
      },

      entityRemoved(json, ctx) {
        this.logger.info('Entity removed', json);
      },
      // Add Hooks to DB actions
      hooks: {
        before: {
          create: [
            async function hashPW(ctx, res) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(ctx.params.password, salt);
              ctx.params.password = hash;
            },
          ],
        },
        after: {
          get: [
            (ctx, res) => {
              delete res.password;
              return res;
            },
          ],
          find: [
            (ctx, res) => {
              return res.map((user) => {
                delete user.password;
                return user;
              });
            },
          ],
        },
      },
    });
  }
}
