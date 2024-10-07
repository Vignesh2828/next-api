import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";
import { authQuery }  from '../../../../lip/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password,role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await authQuery('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering user' });
    }
}
