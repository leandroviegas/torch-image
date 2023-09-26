import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/db/models/User";

export default function AuthValidator(permitedRoles: string[], handle: (req: NextApiRequest, res: NextApiResponse, next?: any) => Promise<void>) {
    return async function Validator(req: NextApiRequest, res: NextApiResponse, next: any) {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user) throw new Error("unauthorized");

        const user = await User.findOne({ where: { email: session.user.email } })

        if(!user) throw new Error("user-not-found");

        if (!permitedRoles.includes(user.role)) throw new Error("access-denied");

        req.user = user;

        return await handle(req, res, next)
    }
}