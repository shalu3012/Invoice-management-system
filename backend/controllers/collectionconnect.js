import db from require('../db/connection')

const agg = [
  {
    '$lookup': {
      'from': 'users', 
      'localField': 'user_id', 
      'foreignField': '_id', 
      'as': 'companyInformation'
    }
  }
];

const coll = db('invoiveUserRegistration').collection('coinfos');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log(result)
await client.close();