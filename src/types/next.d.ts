import { NextApiRequest } from "next"

declare module "next" {
    interface NextApiRequest {
        user: {
            id: string;
            username: string;
            email: string;
            role: string;
            link: string;
            profilePicture: string;
        }
    }
}