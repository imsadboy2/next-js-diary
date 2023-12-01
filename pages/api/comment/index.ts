import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';



export default async function handler (req:NextApiRequest, res:NextApiResponse) {

  let session = await getServerSession(req, res, authOptions)
  let id = req.query.id?.toString()
  let setid = new ObjectId(id)


  if(req.method == 'GET') {
    const db = (await connectDB).db('forum')
    let result = await db.collection('comment').find({ parent: setid }).toArray()
    return res.status(200).json(result)
  }

  if(req.method == 'POST'){
  try{
    req.body = JSON.parse(req.body)

    let data = {
      content : req.body.comment,
      parent : new ObjectId(req.body._id),
      author : session?.user?.email
    }

    let db = (await connectDB).db('forum')
    let result = await db.collection('comment').insertOne(data)
    return res.status(200).json('댓글이 정상적으로 작성되었습니다.')
  } catch (e) {
    return res.status(500).json(e +  "서버 불안정 해용 나중에 다시 해주세용")
  }

  }

  if(req.method == 'PUT'){
    try{
      req.body = JSON.parse(req.body)
  
      let data = {
        content : req.body.modifycmt,
      }
  
      let db = (await connectDB).db('forum')
      let result = await db.collection('comment').updateOne(
        {_id : new ObjectId(req.body._id)},
        { $set: data}
      );
      return res.status(200).json('댓글이 정상적으로 수정되었습니다.')
    } catch (e) {
      return res.status(500).json(e +  "서버 불안정 해용 나중에 다시 해주세용")
    }
  
    }

    if(req.method == 'DELETE') {
      
      req.body = JSON.parse(req.body)


      try{
        const db = (await connectDB).db('forum')
        const finddb = await db.collection('comment').deleteOne({_id:new ObjectId(req.body._id) })
        return res.status(200).json('댓글 삭제 완료')
      }catch(e) {
        return res.status(500).json('서버가 불안정 합니다. 잠시후 다시 시도해주세요')
      }

    }


}