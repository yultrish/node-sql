const { Model } = require('objection');
const knex = require('../config/db')
const Customer = require('./customer')
Model.knex(knex);


class Order extends Model {
    static tableName = 'orders';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['customer_id'],
            properties: {
                id: { type: 'integer' },
                customer_id: { type: 'integer' },
                price: { type: 'integer' },
                product: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }
  
    static relationMappings = {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'orders.customer_id',
          to: 'customers.id'
        }
      }
    };
  }

  module.exports = Order;