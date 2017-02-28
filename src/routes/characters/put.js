import Joi from 'joi';
import Boom from 'boom';
import { characters } from '../../db';

export default [
  {
    method: 'PUT',
    path: '/v1/characters/{id}',
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          name: Joi.string().trim().optional(),
          bio: Joi.string().optional(),
          gender: Joi.string().only('male', 'female', 'other').optional(),
          identity: {
            name: {
              first: Joi.string().trim().optional(),
              middle: Joi.string().trim().optional(),
              last: Joi.string().trim().optional()
            },
            age: Joi.number().min(0).optional()
          },
          kind: Joi.string().trim().optional().default('Mutant'),
          nicknames: Joi.array().items(Joi.string()).unique().optional(),
          rating: Joi.number().min(0).max(100).default(0).optional(),
          universe: Joi.string().trim().optional().default('Marvel')
        }

      }
    },
    handler: {
      async: async(req, reply) => {
        const { id } = req.params;

        const found = await characters.findOne({_id: id});
        delete found._id;
        if(!found) {
          return reply(Boom.notFound('Character not found'));
        }
        const character = Object.assign(found, req.payload);
        const result = await characters.findOneAndUpdate({ _id: id }, { $set: character });

        return reply(result);
      }
    }
  }
]
