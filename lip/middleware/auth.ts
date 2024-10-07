import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = 'myJSONwebtokensecret123';

export function authenticate(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1]; 

    console.log('TOKEN:', token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Decode the token to get user info (id, role, etc.)
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id: number, username:string, role: string };
        req.user = decoded; // Attach user info to req object
        next(); // Call next middleware
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
