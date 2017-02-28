import Joi from 'joi';
import Boom from 'boom';
import { characters } from '../../db';

export default [
  {
    method: 'POST',
    path: '/v1/characters',
    config: {
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().trim().required(),
          bio: Joi.string().trim().optional(),
          gender: Joi.string().only('male', 'female', 'other'),
          identity: {
            name: {
              first: Joi.string().trim().optional(),
              middle: Joi.string().trim().optional(),
              last: Joi.string().trim().optional()
            },
            age: Joi.number().min(0)
          },
          kind: Joi.string().trim().required().default('Mutant'),
          nicknames: Joi.array().items(Joi.string()).unique(),
          rating: Joi.number().min(0).max(100).default(0),
          universe: Joi.string().trim().default('Marvel')
        }
      }
    },
    handler: {
      async: async(req, reply) => {
        const character = req.payload;
        const result = await characters.insert(character);
        return reply(result).status(201);
      }
    }
  }
]
