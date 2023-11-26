import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  if (req.method == 'DELETE') {
    try{
      console.log(req.body)
      let db = (await connectDB).db("forum")
      let result = await db.collection('post').deleteOne({_id:new ObjectId(req.body) })
      res.redirect(302,'/')
    }
    catch(e) {
        res.status(500).json(e)
    }

  }
}