import { NextApiRequest, NextApiResponse } from "next";

import User from "@/db/models/User";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { FormError } from "@/types/Errors";
import { compare } from "bcrypt";
import { Op } from "sequelize";

export const config = {
    api: {
        bodyParser: true,
    },
};

export default catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            let { usernameOrEmail, password } = req.body;

            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: usernameOrEmail },
                        { email: usernameOrEmail }
                    ]
                }
            });

            if (!user) throw new Error("user-not-found")

            if (await compare(password, user.password)) {
                res.status(200).json({
                    name: user.username,
                    email: user.email,
                });
            }

            break;
        default:
            res.status(400).json({ message: 'invalid method.' });
    }
})