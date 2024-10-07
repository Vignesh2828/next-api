import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../lip/middleware/auth';

const protectedRouteHandler = (req: NextApiRequest, res: NextApiResponse) => {
    // This will only run if authentication is successful
    res.status(200).json({ message: 'This is a protected route', user: req.user });
};

// Use the middleware in the route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Call the authenticate middleware
    return new Promise<void>((resolve) => {
        authenticate(req, res, () => {
            protectedRouteHandler(req, res);
            resolve();
        });
    });
}