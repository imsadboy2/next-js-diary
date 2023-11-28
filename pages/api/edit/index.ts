import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  
  if(req.method == 'POST') {
    if(req.body.title == '' || req.body.content == '' || req.body.feeling == ''){
      return res.status(400).json("제목, 내용, 기분 빈 곳이 있는지 확인해주세요")
    }
    try {
      let changedata = {title:req.body.title, feeling:req.body.feeling, content:req.body.content}
      let db = (await connectDB).db('forum')
      let result = await db.collection('post').updateOne(
        {_id : new ObjectId(req.body._id)},
        { $set: changedata}
      );
      res.redirect(302,'/')
    } catch (e){
      return res.status(500).json("서버가 불안정 합니다. 잠시 후 다시 시도해주세요" + e)
    }
  }

  if(req.method == 'GET') {
    let reqid = req.query._id?.toString()
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').findOne({ _id: new ObjectId(reqid) })
    return res.status(200).json(result)
  }
}