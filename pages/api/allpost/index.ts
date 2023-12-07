import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  
  if(req.method == 'GET') {
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').find().toArray()
    return res.status(200).json(result)
  }
}