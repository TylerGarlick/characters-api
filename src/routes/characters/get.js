import Joi from 'joi';
import Boom from 'boom';
import { characters } from '../../db';

export default [
  {
    method: 'GET',
    path: '/v1/characters',
    config: {
      tags: ['api']
    },
    handler: {
      async: async(req, reply) => {
        const results = await characters.find({});
        return reply(results);
      }
    }
  },
  {
    method: 'GET',
    path: '/v1/characters/{id}',
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    },
    handler: {
      async: async(req, reply) => {
        const { id } = req.params;
        const character = await characters.findOne({ _id: id });
        if (!character) {
          return reply(Boom.notFound(`Character with ${id} not found.`))
        }
        return reply(character);
      }
    }
  }
]
