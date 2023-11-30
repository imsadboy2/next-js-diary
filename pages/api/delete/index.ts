import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  if (req.method == 'DELETE') {
    const session = await getServerSession(req, res, authOptions)
    const db = (await connectDB).db('forum')
    const finddb = await db.collection('post').findOne({_id:new ObjectId(req.body) })

    if(finddb?.writer == session?.user?.email){
      try{
        let db = (await connectDB).db("forum")
        let cmt = await db.collection('comment').deleteMany({parent:new ObjectId(req.body)})
        let result = await db.collection('post').deleteOne({_id:new ObjectId(req.body) })
        res.redirect(302,'/')
      }
      catch(e) {
          res.status(500).json(e)
      }
    } else {
      return res.status(500).json("글 수정, 삭제는 작성자 본인만이 할 수 있습니다.")
    }
  }
}