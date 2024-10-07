// types/next.d.ts
import { NextApiRequest } from 'next';
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload type

// Define a specific user type based on your JWT structure
interface User {
    id: number; // Adjust based on your JWT payload
    username: string; // Adjust based on your JWT payload
    role:string
    // Add any other fields present in your JWT payload
}

declare module 'next' {
    export interface NextApiRequest {
        user?: User & JwtPayload; // Combine User type with JwtPayload
    }
}
