import { NextApiRequest,NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { authQuery }  from '../../../../lip/auth'

const JWT_SECRET = 'myJSONwebtokensecret123'

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method === 'POST'){
    

    const {username, password} = req.body

    console.log('username:',username)
    console.log('password:',password)

    if(!username || !password){
        return res.status(400).json({message : 'Username and Password are required'})
    }

    try {
        const user = await authQuery('SELECT * FROM users WHERE username = ?', [username])

        if(user.length === 0){
            return res.status(401).json({message : 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch){
            return res.status(401).json({message : 'Invalid credentials'})
        }

       const token = jwt.sign({ id: user[0].id, role: user[0].role }, JWT_SECRET, { expiresIn: '1h' });

       console.log('tken:', token)

       return res.status(200).json({token})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in' });
    }
} else {
    res.setHeader("Allow", [ "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
}