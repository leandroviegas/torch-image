import { NextApiRequest, NextApiResponse } from "next";

import User from "@/db/models/User";
import catchAsyncErrors from "@/middlewares/ErrorHandler";
import { FormError } from "@/types/Errors";

export const config = {
    api: {
        bodyParser: true,
    },
};

export default catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':
            let { username, email, password } = req.body;

            console.log(req.body)

            const user = await User.create({ username, email, password })
                .catch(e => {
                    throw new FormError(
                        'There are invalid field(s).',
                        '400',
                        e.errors?.map((error: any) => ({ field: error.path, message: error.message }))
                    );
                });

            res.status(200).json({
                user
            });
            break;
        default:
            res.status(400).json({ message: 'invalid method.' });
    }
})