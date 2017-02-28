import Joi from 'joi';
import Boom from 'boom';
import { characters } from '../../db';

export default [
  {
    method: 'DELETE',
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
        const result = await characters.findOneAndDelete({ _id: id });
        if(!result) {
          return reply(Boom.notFound('Character not found'));
        }
        return reply(result);
      }
    }
  }
]
