import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function hanlder(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end()
    }
    
    try {
        await serverAuth(req);
        
        const movies = await prismadb.movie.findMany({
            where : {
                NOT : [
                    {thumbnailUrl : "null"}
                ]
            }
        })
        
        return res.status(200).json(movies)
        
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}