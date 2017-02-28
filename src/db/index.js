import Monk from 'monk';

const connection = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/characters';


export const db = Monk(connection);

export const characters = db.get('characters');



