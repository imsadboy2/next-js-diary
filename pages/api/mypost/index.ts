import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  let id = req.query.id?.toString()

  if(req.method == 'GET') {
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').find({ writer: id }).toArray()
    return res.status(200).json(result)
  }
}