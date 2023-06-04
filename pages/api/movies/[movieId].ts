import { NextApiRequest, NextApiResponse } from "next";
import prismadbdb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth";

export default async function hanlder( req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }
    
        await serverAuth(req, res)
        
        const { movieId } = req.query
        
        if (typeof movieId !== 'string') {
            throw new Error('Invalid ID')
        }
        
        if (!movieId) {
            throw new Error('Missing ID')
        }
        
        const movie = prismadbdb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        
        if (!movie) {
            throw new Error('Invalid ID')
        }
        
        return res.status(200).json(movie)
        
    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}